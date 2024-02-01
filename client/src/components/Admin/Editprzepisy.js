import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectPrzepisyById } from "../../features/przepisyApiSlice"
import Loading from "../Notifications/Loading"
import EditPrzepisy from "./components/EditPrzepisy"

export default function Editprzepisy() {
  const { przepisyid } = useParams()

  const przepisy = useSelector((state) => selectPrzepisyById(state, przepisyid))

  const content = przepisy ? <EditPrzepisy przepisy={przepisy} /> : <Loading />

  return content
}
