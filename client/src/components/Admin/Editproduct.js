import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectProductById } from "../../features/productsApiSlice"
import Loading from "../Notifications/Loading"
import EditProduct from "./components/EditProduct"

export default function Editproduct() {
  const { productid } = useParams()

  const product = useSelector((state) => selectProductById(state, productid))

  const content = product ? <EditProduct product={product} /> : <Loading />

  return content
}
