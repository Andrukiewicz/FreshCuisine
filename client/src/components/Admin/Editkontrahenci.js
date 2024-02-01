import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectKontrahenciById } from "../../features/kontrahenciApiSlice"

import Loading from "../Notifications/Loading"
import EditKontrahenci from "./components/EditKontrahenci"

export default function Editkontrahenci() {
  const { kontrahenciid } = useParams()

  const kontrahenci = useSelector((state) =>
    selectKontrahenciById(state, kontrahenciid)
  )

  const content = kontrahenci ? (
    <EditKontrahenci kontrahenci={kontrahenci} />
  ) : (
    <Loading />
  )

  return content
}
