import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectSkladnikiById } from "../../features/skladnikiApiSlice"
import Loading from "../Notifications/Loading"
import EditSkladniki from "./components/EditSkladniki"

export default function Editskladniki() {
  const { skladnikiid } = useParams()

  const skladniki = useSelector((state) =>
    selectSkladnikiById(state, skladnikiid)
  )

  const content = skladniki ? (
    <EditSkladniki skladniki={skladniki} />
  ) : (
    <Loading />
  )

  return content
}
