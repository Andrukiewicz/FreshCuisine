import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectProducenciById } from "../../features/producenciApiSlice"

import Loading from "../Notifications/Loading"
import EditProducenci from "./components/EditProducenci"

export default function Editproducenci() {
  const { producenciid } = useParams()

  const producenci = useSelector((state) =>
    selectProducenciById(state, producenciid)
  )

  const content = producenci ? (
    <EditProducenci producenci={producenci} />
  ) : (
    <Loading />
  )

  return content
}
