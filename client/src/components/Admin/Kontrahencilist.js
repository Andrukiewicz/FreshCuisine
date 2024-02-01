import React, { useEffect } from "react"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"
import { useGetAllKontrahenciQuery } from "../../features/kontrahenciApiSlice"
import KontrahenciList from "./components/KontrahenciList"
import { useNavigate, useLocation, Link } from "react-router-dom"
import Success from "../Notifications/Success"

export default function Kontrahencilist() {
  const {
    data: kontrahenci,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllKontrahenciQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const { state } = useLocation()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (state?.data?.message) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [navigate, location])

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids } = kontrahenci

    const tableContent = ids?.length
      ? ids.map((kontrahenciId) => (
          <KontrahenciList key={kontrahenciId} kontrahenciId={kontrahenciId} />
        ))
      : null

    content = (
      <div className='flex-column withSidebar'>
        <div className='pt-3 pb-3'>
          <h3>Kontrahenci</h3>
          {state ? <Success success={state?.data?.message} /> : ""}
        </div>
        <div className='center-all flex-column d-flex py-3'>
          <div className='row'>
            <Link to='/admin/addkontrahenci'>
              <button type='button'>DODAJ KONTRAHENTA</button>
            </Link>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>NIP</th>
              <th>Telefon</th>
              <th>E-mail</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    )
  }
  return content
}
