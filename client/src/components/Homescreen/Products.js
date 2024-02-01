import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectProductClientById } from "../../features/productsClientApiSlice"
import { addToCart } from "../../features/cartSlice"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

function ImageModal({ product, onClose }) {
  // Add this to disable scrolling on the website while the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("backdrop")) {
        onClose()
      }
    }

    window.addEventListener("click", handleOutsideClick)

    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
  }, [onClose])

  return (
    <div className='backdrop fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-neutral-100/30 bg-opacity-75 backdrop-blur-sm dark:bg-neutral-900/30'>
      <div className='z-15 shadow-xl max-w-3xl overflow-hidden rounded-lg bg-neutral-100/95 backdrop-blur-sm dark:bg-neutral-900/95'>
        <div className='relative flex flex-col items-center p-2 lg:p-8'>
          <button
            className='absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-400'
            onClick={onClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <h1 className='text-lg font-bold py-3'>{product.name}</h1>
          {product.week.map((week, subindex) => (
            <button
              key={subindex}
              className='max-w-xl flex w-full flex-row items-center py-2 hover:rounded-lg hover:bg-neutral-400 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75'
            >
              <div className='w-1/6'>
                {week.imageName ? (
                  <img
                    className='object-contain'
                    src={`https://www.3klik.pl/images/przepisy/${week.imageName}`}
                    alt={week.name}
                  ></img>
                ) : (
                  ""
                )}
              </div>
              <div className='w-5/6 items-center pl-3'>
                <span>{week.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Products({ productId }) {
  const product = useSelector((state) =>
    selectProductClientById(state, productId)
  )

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [hover, setHover] = useState()

  const [quantity] = useState(1)

  const dispatch = useDispatch()
  function addtocart() {
    // var weeks = product.week.map(function (i) {
    //   return i.name
    // })
    const cartItem = {
      name: product.name,
      _id: product._id,
      category: product.category,
      image: product.image,
      description: product.description,
      description2: product.description2,
      description3: product.description3,
      quantity: Number(quantity),
      price: product.price,
      priceTotal: product.price * quantity,
      week: product.week,
    }
    dispatch(addToCart(cartItem, quantity))
    window.location.href = "/koszyk"
  }

  let productImageSrc

  try {
    productImageSrc = require(`../../images/box/${product?.image}`)
  } catch (err) {
    productImageSrc = null
  }

  if (product) {
    return (
      <div className='flex flex-col items-center gap-1 rounded-md bg-neutral-200 p-5 shadow-highlight dark:bg-neutral-800 md:p-3 lg:p-5'>
        {selectedProduct && (
          <ImageModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
        <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
          <button onClick={() => setSelectedProduct(product)}>
            <div className='absolute top-0 right-0'>
              <i
                className={`fa fa-search text-lg items-center text-center justify-center px-4 py-3 text-black dark:text-white ${
                  hover
                    ? "bg-white dark:bg-neutral-900"
                    : "bg-neutral-500/50 dark:bg-neutral-900/50"
                } rounded-full`}
              ></i>
            </div>
            {productImageSrc ? (
              <img
                src={require(`../../images/box/${product?.image}`)}
                alt={product.name}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className='contrast mx-auto h-full w-full object-contain object-center'
              />
            ) : (
              <div className='text-sm'>Zdjęcie niedostępne</div>
            )}
          </button>
        </div>
        <h3 className='mt-4 text-base font-bold sm:text-2xl md:text-lg lg:text-2xl xl:text-3xl'>
          {product.number}
        </h3>
        <p className='mt-1 text-xl font-medium sm:text-2xl'>
          {product.price}zł
        </p>
        <button
          key={product.id}
          href='#'
          className='flex h-12 w-auto items-center justify-center rounded-lg bg-klik px-6 font-semibold text-white shadow-highlight hover:bg-kliklight focus:outline-none focus:ring-2 focus:ring-klik focus:ring-offset-2 focus:ring-offset-slate-50'
          onClick={() => addtocart()}
        >
          <ShoppingCartIcon
            className='mr-2 inline-block h-6 w-6'
            aria-hidden='true'
          />
          <p className='text-lg font-bold'>Dodaj</p>
        </button>
      </div>
    )
  } else return null
}
