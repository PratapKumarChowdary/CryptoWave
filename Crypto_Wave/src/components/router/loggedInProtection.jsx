import React from "react"
import { getToken } from "../../store"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { AuthSelector } from "../../store/auth"

const LoggedInProtection = ({ children }) => {
  const isAuthenticated = useSelector(AuthSelector.isLoggedIn)
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default LoggedInProtection
