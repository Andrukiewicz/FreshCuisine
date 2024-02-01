const Przepisy = require("../models/przepisyModel")
const Orders = require("./../models/ordersModel")
const User = require("./../models/usersModel")
const moment = require("moment")
const stripe = require("stripe")(process.env.STRIPE_BACK_KEY)

async function webhook(req, res) {
  let event = req.body
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  // Get the signature sent by Stripe
  const signature = req.headers["stripe-signature"]
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message)
    return res.sendStatus(400)
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const intent = event.data.object
      // Fulfill the purchase...
      try {
        const order = await Orders.findOneAndUpdate(
          {
            paymentId: intent.id,
          },
          {
            paid: true,
            orderAmount: intent.amount / 100,
            name: intent.shipping.name,
            phoneNumber: intent.shipping.phone.toString(),
            shippingAddress: {
              line1: intent.shipping.address.line1,
              line2: intent.shipping.address.line2,
              postal_code: intent.shipping.address.postal_code,
              city: intent.shipping.address.city,
            },
          }
        )

        await User.findOneAndUpdate(
          {
            _id: order.userid,
          },
          {
            shipping: {
              line1: intent.shipping.address.line1,
              line2: intent.shipping.address.line2,
              postal_code: intent.shipping.address.postal_code,
              city: intent.shipping.address.city,
            },
          }
        )
      } catch (error) {
        return res
          .status(400)
          .json({ statusCode: 400, message: "Coś poszło nie tak" + error })
      }
      // console.log("Fulfilling order", session);
      // console.log("Event data", session);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break
    case "charge.succeeded":
      const intentCharge = event.data.object
      try {
        await Orders.findOneAndUpdate(
          {
            paymentId: intentCharge.payment_intent,
          },
          {
            email: intentCharge.billing_details.email,
            phoneNumber: intentCharge.shipping.phone.toString(),
          }
        )
      } catch (error) {
        return res
          .status(400)
          .json({ statusCode: 400, message: "Coś poszło nie tak" + error })
      }
      break
    default:
    // Unexpected event type
    // console.log(`Unhandled event type ${event.type}.`)
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send()
}

module.exports = webhook
