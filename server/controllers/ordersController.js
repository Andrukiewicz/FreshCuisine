const asyncHandler = require("express-async-handler")
const Orders = require("../models/ordersModel")
const Products = require("../models/productsModel")
const PostCode = require("../models/postcodeModel")
const sendMail = require("../controllers/sendMailOrder")
const moment = require("moment")
const axios = require("axios")
const pako = require("pako")

const soapRequest = require("easy-soap-request")
const fs = require("fs")

const stripe = require("stripe")(process.env.STRIPE_BACK_KEY)
const dotenv = require("dotenv")
dotenv.config()

var today = new Date(),
  oneDay = 1000 * 60 * 60 * 24,
  thirtyDays = new Date(today.valueOf() - 30 * oneDay),
  fifteenDays = new Date(today.valueOf() - 15 * oneDay),
  eightDays = new Date(today.valueOf() - 8 * oneDay)

const calculateOrderAmount = async (items) => {
  let amount = 0
  for (let item of items) {
    const product = await Products.findOne({ _id: item.itemId })
    amount += product.price * item.quantity
  }
  return parseFloat(amount.toFixed(2))
}

const paymentIntent = asyncHandler(async (req, res) => {
  try {
    const { email, line_items_order, id, deliveryInfo } = req.body

    // Creating custom order ID
    function customId(length) {
      var result = ""
      const characters = "0123456789"
      const year = moment().format("YY")
      const month = moment().format("MM")
      var charactersLength = characters.length
      for (var i = 0; i < length - 4; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return Number(year + month + result)
    }

    // Creating custom delivery date
    let deliveryDate
    let d = new Date()
    let day = d.getDay()

    if (day === 0) {
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 3) % 7))
      deliveryDate = d
    } else {
      if (day === 1) {
        d.setDate(d.getDate() + (((7 - d.getDay()) % 7) + 3))
        deliveryDate = d
      } else {
        d.setDate(d.getDate() + (((7 - d.getDay()) % 7) + 3))
        deliveryDate = d
      }
    }

    // Retrieve the corresponding items from the database
    const itemsInDb = await Products.find({
      _id: { $in: line_items_order.map((item) => item.itemId) },
    })

    let invalidOrder = false
    line_items_order.forEach((orderItem) => {
      const itemInDb = itemsInDb.find((dbItem) =>
        dbItem._id.equals(orderItem.itemId)
      )
      if (
        !itemInDb ||
        itemInDb.price !== orderItem.price ||
        itemInDb.name !== orderItem.name
      ) {
        invalidOrder = true
      }
    })

    const calculatedAmount = await calculateOrderAmount(line_items_order)

    // Creating paymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number((calculatedAmount * 100).toFixed(0)),
      currency: "pln",
      automatic_payment_methods: {
        enabled: true,
      },
    })
    // Creating order in database with paymentIntent ID
    await new Orders({
      _id: customId(14),
      email,
      userid: id,
      paymentId: paymentIntent.id,
      orderItems: line_items_order,
      orderAmount: Number(calculatedAmount.toFixed(2)),
      deliveryDay: deliveryDate,
      deliveryInfo,
    }).save()

    if (invalidOrder) {
      return res.status(400).send({ error: "Nieprawidłowe zamówienie" })
    } else {
      return res.status(200).send({
        clientSecret: paymentIntent.client_secret,
        paymentId: paymentIntent.id,
      })
    }
  } catch (error) {
    console.log(error)
  }
})

const paymentStatus = asyncHandler(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.body.paymentIntent
    )
    // const customer = await stripe.customers.retrieve(session.customer)
    if (paymentIntent.status === "succeeded") {
      // Payment succeeded, update your database and send a success response to the client
      return res.status(200).json({
        message: "Sukces! Płatność powiodła się!",
        payment_status: paymentIntent.status,
      })
    } else if (paymentIntent.status === "processing") {
      // Payment is processing, send a message to the client indicating that they will be updated when payment is received
      return res.status(202).json({
        message:
          "Przetwarzanie płatności. Damy znać gdy dowiemy się czegoś więcej!",
        payment_status: paymentIntent.status,
      })
    } else if (paymentIntent.status === "requires_payment_method") {
      // Payment failed, send a message to the client indicating that they should try another payment method
      return res.status(402).json({
        error:
          "Coś poszło nie tak podczas przetwarzania płatności. Prosimy złóż zamówienie jeszcze raz!",
        payment_status: paymentIntent.status,
      })
    } else {
      // An error occurred, send an error message to the client
      return res.status(400).json({
        error: "Coś poszło nie tak. Prosimy złóż zamówienie jeszcze raz!",
        payment_status: paymentIntent.status,
      })
    }
  } catch (error) {
    return res.status(404).json({
      error: "Brak zamówienia o podanym numerze",
    })
  }
})

const getUserOrders = asyncHandler(async (req, res) => {
  const id = req.id
  try {
    const orders = await Orders.find({ userid: id })
    res.send(orders)
  } catch (error) {
    return res.status(400).json({ message: "Coś poszło nie tak" })
  }
})

const kalkulatorTowaru = asyncHandler(async (req, res) => {
  try {
    const kalkulator = await Orders.aggregate([
      {
        $match: {
          paid: true,
          isSent: false,
        },
      },
      { $unwind: "$orderItems" },
      { $unwind: "$orderItems.week" },
      {
        $lookup: {
          from: "przepisy",
          localField: "orderItems.week.name",
          foreignField: "name",
          as: "orderItems.week",
        },
      },
      { $unwind: "$orderItems.week" },
      {
        $group: {
          _id: "$_id",
          orderItems: {
            $push: "$orderItems.week",
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      { $group: { _id: "$orderItems.name" } },
      {
        $lookup: {
          from: "przepisy",
          localField: "_id",
          foreignField: "name",
          as: "towar",
        },
      },
      {
        $unwind: "$towar",
      },
      {
        $set: {
          towar: "$towar.skladniki",
        },
      },
      {
        $unwind: "$towar",
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ["$towar"] } },
      },
      {
        $group: {
          _id: { _id: "$_id", value: "$value" },
          jednostka: { $first: "$jednostka" },
          ilosc: { $sum: 1 },
          value: { $first: "$value" },
          uniqueIds: {
            $addToSet: { _id: "$_id", value: "$value" },
          },
        },
      },
      {
        $lookup: {
          from: "skladniki",
          localField: "_id._id",
          foreignField: "_id",
          as: "zamowienie",
        },
      },
      {
        $unwind: "$zamowienie",
      },
      {
        $match: {
          "zamowienie.invoice": true,
        },
      },
      {
        $project: {
          _id: "$zamowienie._id",
          name: "$zamowienie.name",
          cena: {
            $round: [
              {
                $multiply: ["$zamowienie.cena", "$_id.value", "$ilosc"],
              },
              2,
            ],
          },
          value: "$_id.value",
          jednostka: "$jednostka",
          ilosc: "$ilosc",
          producent: "$zamowienie.producent",
          kontrahent: "$zamowienie.kontrahent",
          uniqueIds: {
            $map: {
              input: "$uniqueIds",
              as: "uniqueId",
              in: {
                $concat: [
                  { $toString: "$$uniqueId._id" },
                  "-",
                  { $toString: { $rand: {} } },
                ],
              },
            },
          },
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ])

    // let data = JSON.stringify(kalkulator, null, 4)
    // fs.writeFileSync("kalkulator.txt", data)
    res.send(kalkulator)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

const pakowanie = asyncHandler(async (req, res) => {
  try {
    const pakowanie = await Orders.aggregate([
      {
        $match: {
          isSent: false,
          paid: true,
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $unwind: "$orderItems.week",
      },
      {
        $lookup: {
          from: "przepisy",
          localField: "orderItems.week.name",
          foreignField: "name",
          as: "orderItems.week",
        },
      },
      {
        $unwind: "$orderItems.week",
      },
      {
        $group: {
          _id: "$_id",
          orderItems: {
            $push: "$orderItems.week",
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.name",
          count: {
            $sum: 1,
          },
          towar: {
            $push: "$orderItems.skladniki",
          },
        },
      },
      {
        $unwind: "$towar",
      },
      {
        $unwind: "$towar",
      },
      {
        $lookup: {
          from: "skladniki",
          localField: "towar._id",
          foreignField: "_id",
          as: "skladniki",
        },
      },
      {
        $unwind: "$skladniki",
      },
      {
        $match: {
          "skladniki.invoice": true,
        },
      },
      {
        $group: {
          _id: "$_id",
          count: { $first: "$count" },
          towar: {
            $push: {
              _id: "$skladniki._id",
              name: "$skladniki.name",
              value: "$towar.value",
              jednostka: "$towar.jednostka",
            },
          },
        },
      },
    ])

    // console.log(JSON.stringify(pakowanie, null, 4))
    // let data = JSON.stringify(pakowanie, null, 4)
    // fs.writeFileSync("pakowanie.txt", data)
    res.send(pakowanie)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Orders.find({ isSent: true, paid: false })
    // const orders = await Orders.find()
    res.send(orders)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

const deliverOrder = asyncHandler(async (req, res) => {
  const orderid = req.body._id
  try {
    const order = await Orders.findOne({ _id: orderid })
    order.isSent = true
    moment.locale("pl")
    const date = new Date()
    order.sentDate = date
    await order.save()
    const email = order.email
    const url = "https://www.3klik.pl/zamowienia"
    const orderID = order._id
    const createdAt = order.createdAt
    const userName = order.name.split(/ (.*)/)[0]
    const adres1 = order.shippingAddress.line1
    const adres2 = order.shippingAddress.line2
    const city = order.shippingAddress.city
    const postalCode = order.shippingAddress.postal_code
    const deliveryDay = order.deliveryDay
    const fullYear = new Date().getFullYear()
    const deliveryTime = order.deliveryTime
    sendMail(
      email,
      url,
      "Zamówienie w drodze!",
      orderID,
      createdAt,
      userName,
      adres1,
      adres2,
      city,
      postalCode,
      deliveryDay,
      fullYear,
      deliveryTime
    )
    return res.status(200).json({ message: "Email wysłany" })
  } catch (error) {
    return res.status(400).json({ message: "Coś poszło nie tak" })
  }
})

const dpdLabel = asyncHandler(async (req, res) => {
  try {
    let d = new Date()
    d.setDate(d.getDate() + (d.getDay() + 7))
    moment.locale("pl")
    const limitDate = moment(d).format("YYYY-MM-DD")
    const { email, address, city, postal_code, customerData1, name, phone } =
      req.body

    if (customerData1 === "undefined") {
      customerData1 = "-"
    }

    const shortPostalCode = postal_code.replaceAll("-", "")

    // const xml = fs.readFileSync("zipCodeEnvelope.xml", "utf-8")
    const xml = `<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dpd="http://dpdservices.dpd.com.pl/">
	<soapenv:Header/>
	<soapenv:Body>
		<dpd:generatePackagesNumbersV8>
			<openUMLFeV9>
				<packages>
					<parcels>
						<content>DPD FOOD</content>
						<customerData1>${customerData1}</customerData1>
						<sizeX>60</sizeX>
						<sizeY>38</sizeY>
						<sizeZ>27</sizeZ>
						<weight>20</weight>
					</parcels>
					<payerType>THIRD_PARTY</payerType>
					<thirdPartyFID>366377</thirdPartyFID>
					
					<sender>
						<company>3klik s.c.</company>
						<name>3klik</name>
						<address>Konarskiego 25</address>
						<city>Giżycko</city>
						<postalCode>11500</postalCode>
						<countryCode>PL</countryCode>
						<email>kontakt@3klik.pl</email>
						<phone>796445923</phone>
					</sender>
					
					<receiver>
						<company></company>
						<name>${name}</name>
						<address>${address}</address>
						<city>${city}</city>
						<postalCode>${shortPostalCode}</postalCode>
						<countryCode>PL</countryCode>
						<email>${email}</email>
						<phone>${phone}</phone>
					</receiver>
					

					
				</packages>
			</openUMLFeV9>
			<pkgNumsGenerationPolicyV1>ALL_OR_NOTHING</pkgNumsGenerationPolicyV1>
			<langCode>PL</langCode>
			
			<authDataV1>
				<login>36637701</login>
				<masterFid>366377</masterFid>
				<password>dzNcwGbv5fB0PXEO</password>
			</authDataV1>
			
		</dpd:generatePackagesNumbersV8>
	</soapenv:Body>
</soapenv:Envelope>`

    // example data
    const url =
      "https://dpdservices.dpd.com.pl/DPDPackageObjServicesService/DPDPackageObjServices?WSDL"

    //       					<services>
    //           <dpdFood>
    // <limitDate>${limitDate}</limitDate>
    // </dpdFood>
    // 					</services>
    const config = {
      headers: {
        "Content-Type": "application/xml",
      },
      responseType: "arraybuffer",
    }

    await axios
      .post(url, xml, config)
      .then(async (response) => {
        const decodedData = pako.inflate(response.data, { to: "string" })
        const xmlDoc = await parser.parseFromString(decodedData, "text/xml")
        const waybill = xmlDoc.getElementsByTagName("Waybill")[0].textContent
        console.log("waybill:", waybill)
        const generateSpedLabelsXml = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dpd="http://dpdservices.dpd.com.pl/">
          <soapenv:Header/>
          <soapenv:Body>
            <dpd:generateSpedLabelsV4>
              <dpdServicesParamsV1>
                <policy>IGNORE_ERRORS</policy>
                <session>
                  <packages>
                    <parcels>
                      <waybill>${waybill}</waybill>
                    </parcels>
                  </packages>
                  <sessionType>DOMESTIC</sessionType>
                </session>
              </dpdServicesParamsV1>
              <outputDocFormatV1>PDF</outputDocFormatV1>
              <outputDocPageFormatV1>A4</outputDocPageFormatV1>
              <outputLabelType>BIC3</outputLabelType>
              <langCode>PL</langCode>

              <authDataV1>
                <login>36637701</login>
                <masterFid>366377</masterFid>
                <password>pass</password>
              </authDataV1>

            </dpd:generateSpedLabelsV4>
          </soapenv:Body>
        </soapenv:Envelope>
      `
        const generateSpedLabelsConfig = {
          headers: {
            "Content-Type": "application/xml",
          },
          responseType: "arraybuffer",
        }
        await axios
          .post(url, generateSpedLabelsXml, generateSpedLabelsConfig)
          .then(async (response) => {
            const decodedPdf = pako.inflate(response.data, { to: "string" })
            const pdfXmlDoc = await parser.parseFromString(
              decodedPdf,
              "text/xml"
            )
            const pdfBase64 =
              pdfXmlDoc.getElementsByTagName("documentData")[0].textContent
            const pdfBuffer = Buffer.from(pdfBase64, "base64")
            // Do something with the pdfBuffer, e.g. save it to a file or return it in the response
            // Set the response headers to specify the content type and attachment filename
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=download.pdf"
            )

            // Send the PDF buffer as the response body
            res.send(pdfBuffer)
          })
          .catch((error) => {
            const parsedError = JSON.stringify(error)
            res.status(400).json({ error: parsedError })
          })
      })
      .catch((error) => {
        const parsedError = JSON.stringify(error)
        res.status(400).json({ error: parsedError })
      })

    // fs.writeFileSync("przepisy.txt", body)
  } catch (error) {
    // const parsedError = JSON.stringify(error)
    // console.log(error)
    return res.status(400).json({ error: "Coś poszło nie tak Drugi" })
  }
})

const postCodeHome = asyncHandler(async (req, res) => {
  const { postCode } = req.body

  const postCodeCheck = await PostCode.findOne({ postcode: postCode }).exec()

  if (postCodeCheck) {
    return res.status(200).json({ message: "Dostarczamy pod ten adres!" })
  } else {
    return res
      .status(400)
      .json({ error: "Jeszcze nie dostarczamy pod ten adres!" })
  }
})

const postCode = asyncHandler(async (req, res) => {
  try {
    const { postCode, paymentId } = req.body

    const order = await Orders.findOne({ paymentId: paymentId.paymentId })
    const savedAmountIntent = Number((order.orderAmount * 100).toFixed(0))

    var deliveryAdded = 0

    // Find one document by postcode and check if it has parameter deliveryFree
    const postCodePayment = await PostCode.findOne({
      postcode: postCode,
    }).exec()

    if (postCodePayment && postCodePayment.deliveryFee) {
      // Updating paymentIntent
      if (deliveryAdded === 0) {
        await stripe.paymentIntents.update(paymentId.paymentId, {
          amount: savedAmountIntent + 2500,
        })
        deliveryAdded = deliveryAdded + 25
      } else {
        await stripe.paymentIntents.update(paymentId.paymentId, {
          amount: savedAmountIntent,
        })
      }
      order.deliveryFee = true
      await order.save()
      return res.status(200).json({
        message: "Doliczono koszt przesyłki 25zł!",
        deliveryFee: true,
      })
    } else if (postCodePayment && !postCodePayment.deliveryFee) {
      stripe.paymentIntents.update(paymentId.paymentId, {
        amount: savedAmountIntent,
      })
      order.deliveryFee = false
      await order.save()
      return res.status(200).json({
        message: "Darmowa dostawa na terenie Giżycka i okolic!",
        deliveryFee: false,
      })
    } else {
      stripe.paymentIntents.update(paymentId.paymentId, {
        amount: savedAmountIntent,
      })
      order.deliveryFee = false
      await order.save()
      return res.status(400).json({
        error: "Jeszcze nie dostarczamy pod ten adres!",
        deliveryFee: false,
      })
    }
  } catch (error) {
    return res.status(400).json({
      message: "Wystąpił błąd. Spróbuj ponownie później!",
    })
  }
})

const fakturownia = asyncHandler(async (req, res) => {
  try {
    const { orderId, deliveryFee } = req.body
    const orderAddress = await Orders.findOne({ _id: orderId })
    const orders = await Orders.aggregate([
      // {
      //   $match: {
      //     _id: orderId,
      //     isSent: false,
      //   },
      // },
      {
        $match: {
          _id: orderId,
        },
      },
      { $unwind: "$orderItems" },
      { $unwind: "$orderItems.week" },
      {
        $lookup: {
          from: "przepisy",
          localField: "orderItems.week.name",
          foreignField: "name",
          as: "orderItems.week",
        },
      },
      { $unwind: "$orderItems.week" },
      {
        $group: {
          _id: "$_id",
          orderItems: {
            $push: "$orderItems.week",
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      { $group: { _id: "$orderItems.name", ilosc: { $sum: 1 } } },
      {
        $lookup: {
          from: "przepisy",
          localField: "_id",
          foreignField: "name",
          as: "towar",
        },
      },
      {
        $unwind: "$towar",
      },
      {
        $set: {
          towar: {
            ilosc: "$ilosc",
          },
        },
      },
      {
        $set: {
          towar: "$towar.skladniki",
        },
      },
      {
        $unwind: "$towar",
      },
      {
        $set: {
          towar: {
            value: {
              $multiply: [{ $toDouble: "$towar.value" }, "$ilosc"],
            },
          },
        },
      },
      {
        $set: {
          towar: {
            value: {
              $round: ["$towar.value", 4],
            },
          },
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ["$towar"] } },
      },
      {
        $group: {
          _id: "$_id",
          jednostka: { $first: "$jednostka" },
          value: {
            $sum: "$value",
          },
        },
      },
      {
        $lookup: {
          from: "skladniki",
          localField: "_id",
          foreignField: "_id",
          as: "zamowienie",
        },
      },
      {
        $unwind: "$zamowienie",
      },
      {
        $match: {
          "zamowienie.invoice": true,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: "$value",
          total_price_gross: {
            $round: [{ $multiply: ["$zamowienie.cena", "$value"] }, 2],
          },
          tax: "$zamowienie.tax",
        },
      },
      {
        $group: {
          _id: { tax: "$tax" },
          quantity: { $sum: 1 },
          total_price_gross: { $sum: "$total_price_gross" },
        },
      },
      {
        $project: {
          _id: 0,
          name: {
            $concat: ["Artykuły spożywcze ", { $toString: "$_id.tax" }, "%"],
          },
          quantity: 1,
          total_price_gross: 1,
          tax: "$_id.tax",
        },
      },
      {
        $sort: {
          tax: 1,
        },
      },
    ])

    function createInvoice(apiKey, invoiceData) {
      return axios({
        method: "POST",
        url: "https://3klik.fakturownia.pl/invoices.json",
        headers: {
          Authorization: "Token token=" + apiKey,
          "Content-Type": "application/json",
        },
        data: invoiceData,
      })
    }

    if (deliveryFee) {
      orders.push({
        name: "Dostawa",
        quantity: 1,
        total_price_gross: 25,
        tax: 23,
      })
    }
    let fixedAddress
    if (orderAddress.shippingAddress.line2) {
      fixedAddress =
        orderAddress.shippingAddress.line1 +
        " " +
        orderAddress.shippingAddress.line2
    } else {
      fixedAddress = orderAddress.shippingAddress.line1
    }

    const invoiceData = {
      invoice: {
        kind: "vat",
        number: null,
        sell_date: moment(orderAddress.createdAt).format("YYYY-MM-DD"),
        issue_date: moment(orderAddress.createdAt).format("YYYY-MM-DD"),
        buyer_name: orderAddress.name,
        buyer_post_code: orderAddress.shippingAddress.postal_code,
        buyer_city: orderAddress.shippingAddress.city,
        buyer_street: fixedAddress,
        buyer_tax_no: null,
        positions: orders,
        paid: orderAddress.orderAmount,
      },
    }

    const apiKey = process.env.FAKTUROWNIA_API_KEY
    await createInvoice(apiKey, invoiceData)
    res.status(200).send({ message: "Utworzono fakturę w Fakturowni!" })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
const fakturaZalacznik = asyncHandler(async (req, res) => {
  const { orderId, deliveryFee } = req.body
  const orderAddress = await Orders.findOne({ _id: orderId })
  Orders.aggregate([
    {
      $match: {
        _id: orderId,
        isSent: false,
      },
    },
    { $unwind: "$orderItems" },
    { $unwind: "$orderItems.week" },
    {
      $lookup: {
        from: "przepisy",
        localField: "orderItems.week.name",
        foreignField: "name",
        as: "orderItems.week",
      },
    },
    { $unwind: "$orderItems.week" },
    {
      $group: {
        _id: "$_id",
        orderItems: {
          $push: "$orderItems.week",
        },
      },
    },
    {
      $unwind: "$orderItems",
    },
    { $group: { _id: "$orderItems.name", ilosc: { $sum: 1 } } },
    {
      $lookup: {
        from: "przepisy",
        localField: "_id",
        foreignField: "name",
        as: "towar",
      },
    },
    {
      $unwind: "$towar",
    },
    {
      $set: {
        towar: {
          ilosc: "$ilosc",
        },
      },
    },
    {
      $set: {
        towar: "$towar.skladniki",
      },
    },
    {
      $unwind: "$towar",
    },
    {
      $set: {
        towar: {
          value: {
            $multiply: [{ $toDouble: "$towar.value" }, "$ilosc"],
          },
        },
      },
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: ["$towar"] } },
    },
    {
      $group: {
        _id: "$name",
        jednostka: { $first: "$jednostka" },
        value: {
          $sum: "$value",
        },
      },
    },
    {
      $lookup: {
        from: "skladniki",
        localField: "_id",
        foreignField: "name",
        as: "zamowienie",
      },
    },
    {
      $unwind: "$zamowienie",
    },
    {
      $match: {
        "zamowienie.invoice": true,
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        quantity: "$value",
        total_price_gross: {
          $round: [{ $multiply: ["$zamowienie.cena", "$value"] }, 2],
        },
        // total_price_gross: "$zamowienie.cena",
        tax: "$zamowienie.tax",
      },
    },
    {
      $sort: {
        name: 1, // 1 for ascending order, -1 for descending order
      },
    },
  ]).exec((err, orders) => {
    if (err) {
      return res.status(500).send(err)
    }
    function createInvoice(apiKey, invoiceData) {
      axios({
        method: "POST",
        url: "https://3klik.fakturownia.pl/invoices.json",
        headers: {
          Authorization: "Token token=" + apiKey,
          "Content-Type": "application/json",
        },
        data: invoiceData,
      })
        .then(function (response) {
          return res
            .status(200)
            .send({ message: "Utworzono fakturę w Fakturowni!" })
        })
        .catch(function (error) {
          return res.status(400).send({ error: "Nie udało się utworzyć" })
        })
    }

    if (deliveryFee) {
      updatedOrders.push({
        name: "Dostawa",
        quantity: 1,
        total_price_gross: 25,
        tax: 23,
      })
    }

    const invoiceData = {
      invoice: {
        kind: "vat",
        number: null,
        sell_date: moment(orderAddress.createdAt).format("YYYY-MM-DD"),
        issue_date: moment(orderAddress.createdAt).format("YYYY-MM-DD"),
        buyer_name: orderAddress.name,
        buyer_post_code: orderAddress.shippingAddress.postal_code,
        buyer_city: orderAddress.shippingAddress.city,
        buyer_street:
          orderAddress.shippingAddress.line1 +
          " " +
          orderAddress.shippingAddress.line2,
        buyer_tax_no: null,
        positions: orders,
        paid: orderAddress.orderAmount,
      },
    }
    const apiKey = process.env.FAKTUROWNIA_API_KEY
    createInvoice(apiKey, invoiceData)
  })
})

module.exports = {
  postCode,
  postCodeHome,
  paymentIntent,
  paymentStatus,
  getUserOrders,
  kalkulatorTowaru,
  pakowanie,
  getAllOrders,
  deliverOrder,
  dpdLabel,
  fakturownia,
}
