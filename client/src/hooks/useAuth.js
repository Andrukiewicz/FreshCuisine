import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = "User"

  if (token) {
    const decoded = jwtDecode(token)
    const { email, roles, id } = decoded.UserInfo

    isManager = roles.includes("Manager")
    isAdmin = roles.includes("Admin")

    if (isManager) status = "Manager"
    if (isAdmin) status = "Admin"

    return { email, id, roles, status, isManager, isAdmin }
  }

  return { email: "", id: "", roles: [], isManager, isAdmin, status }
}

export default useAuth
