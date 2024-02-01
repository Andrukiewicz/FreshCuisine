import Products from "../../components/Homescreen/Products"
import { useGetProductsClientQuery } from "../../features/productsClientApiSlice"
import Loading from "../../components/Notifications/Loading"
import Error from "../../components/Notifications/Error"

export default function LandingProducts() {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsClientQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = products

    let StandardIds
    StandardIds = ids.filter((productId) =>
      entities[productId].category.includes("Miesny")
    )
    let WegeIds
    WegeIds = ids.filter((productId) =>
      entities[productId].category.includes("Wege")
    )
    let MieszanyIds
    MieszanyIds = ids.filter((productId) =>
      entities[productId].category.includes("Mieszany")
    )

    const standardContent = ids?.length
      ? StandardIds.sort((a, b) => (a.priority < b.priority ? 1 : -1)).map(
          (productId) => <Products key={productId} productId={productId} />
        )
      : null

    const wegeContent = ids?.length
      ? WegeIds.sort((a, b) => (a.priority < b.priority ? 1 : -1)).map(
          (productId) => <Products key={productId} productId={productId} />
        )
      : null

    const mieszanyContent = ids?.length
      ? MieszanyIds.sort((a, b) => (a.priority < b.priority ? 1 : -1)).map(
          (productId) => <Products key={productId} productId={productId} />
        )
      : null

    content = (
      <div
        id='zamow'
        className='md mx-auto grid w-full max-w-7xl grid-cols-1 flex-row flex-wrap items-center justify-between gap-3 py-4 px-4 sm:py-8 sm:px-6 lg:px-8'
      >
        <h2 className='sr-only'>Zestawy</h2>
        <div className='rounded-lg bg-neutral-100 p-5 text-center shadow-highlight dark:bg-neutral-800'>
          {/* PC */}
          <div className='hidden flex-col justify-center text-3xl md:flex md:flex-row'>
            <p className='leading-12 font-bold tracking-tight md:pr-2'>
              Wybierz swój
            </p>
            <p className='leading-12 font-bold tracking-tight text-klik md:pr-2'>
              zestaw
            </p>
            <p className='leading-12 font-bold tracking-tight md:pr-2'>
              obiadowy na
            </p>
            <p className='leading-12 font-bold tracking-tight text-klik md:pr-2'>
              6
            </p>
            <p className='leading-12 font-bold tracking-tight'>dni!</p>
          </div>
          {/* Mobile */}
          <div className='flex flex-col justify-center text-4xl sm:text-4xl md:hidden md:text-4xl'>
            <p className='leading-12 pr-1 font-bold tracking-tight md:pr-2'>
              Wybierz swój
            </p>
            <div className='mx-auto flex flex-row'>
              <p className='leading-12 pr-2 font-bold tracking-tight text-klik'>
                zestaw
              </p>
              <p className='leading-12 font-bold tracking-tight'>obiadowy</p>
            </div>
            <div className='mx-auto flex flex-row'>
              <p className='leading-12 pr-2 font-bold tracking-tight'>na</p>
              <p className='leading-12 pr-2 font-bold tracking-tight text-klik'>
                6
              </p>
              <p className='leading-12 font-bold tracking-tight'>dni!</p>
            </div>
          </div>
        </div>
        <div className='mt-3 grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 justify-items-center'>
          <div className='mt-0 grid grid-cols-1 gap-x-6 sm:grid-cols-1 md:mt-8 lg:grid-cols-1 xl:gap-x-8'>
            <div className='text-center flex flex-col'>
              <div className='flex flex-row justify-center'>
                <p className='leading-12 pr-2 text-3xl font-bold tracking-tight sm:text-4xl my-3 text-klikgreen drop-shadow-md shadow-black shadow-xl'>
                  NOWOŚĆ!
                </p>
              </div>
              <div className='flex flex-row justify-center'>
                <p className='leading-12 pr-2 text-3xl font-bold tracking-tight sm:text-3xl'>
                  Zestaw
                </p>
                <p className='leading-12 text-3xl font-bold tracking-tight text-klik sm:text-3xl'>
                  mies
                </p>
                <p className='leading-12 text-3xl font-bold tracking-tight text-klikgreen sm:text-3xl'>
                  zany
                </p>
              </div>
              <div className='flex flex-row justify-center gap-2'>
                <p className='leading-12 text-3xl font-bold tracking-tight text-klik sm:text-3xl'>
                  3 mięsne
                </p>
                <p className='leading-12 text-3xl font-bold tracking-tight sm:text-3xl'>
                  +
                </p>
                <p className='leading-12 text-3xl font-bold tracking-tight text-klikgreen sm:text-3xl'>
                  3 wege
                </p>
              </div>
            </div>
            <div className='mt-3 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:mt-8 xl:gap-x-8'>
              {mieszanyContent}
            </div>
          </div>
        </div>
        <div className='mt-3 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 xl:gap-x-8 justify-self-center'>
          <div className='mt-0 grid grid-cols-1 gap-x-6 sm:grid-cols-1 md:mt-8 lg:grid-cols-1 xl:gap-x-8'>
            <div className='text-center'>
              <div className='flex flex-row justify-center'>
                <p className='leading-12 pr-2 text-3xl font-bold tracking-tight sm:text-3xl'>
                  Zestaw
                </p>
                <p className='leading-12 text-3xl font-bold tracking-tight text-klik sm:text-3xl'>
                  standardowy
                </p>
              </div>
            </div>
            <div className='mt-3 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:mt-8 xl:gap-x-8'>
              {standardContent}
            </div>
          </div>
          <div className='mt-0 grid grid-cols-1 gap-x-6 sm:grid-cols-1 md:mt-8 xl:gap-x-8'>
            <div className='text-center'>
              <div className='flex flex-row justify-center'>
                <p className='leading-12 pr-2 text-3xl font-bold tracking-tight sm:text-3xl'>
                  Zestaw
                </p>
                <p className='leading-12 text-3xl font-bold tracking-tight text-klikgreen sm:text-3xl'>
                  wegetariański
                </p>
              </div>
            </div>
            <div className='mt-3 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:mt-8 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8'>
              {wegeContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return content
}
