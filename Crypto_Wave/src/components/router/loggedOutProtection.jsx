import React from "react"
import { getToken } from "../../store"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { AuthSelector } from "../../store/auth"


const LoggedOutProtection = ({ children }) => {
  const isAuthenticated = useSelector(AuthSelector.isLoggedIn)
  return !isAuthenticated ?  children : <Navigate to="/" />
}

export default LoggedOutProtection
