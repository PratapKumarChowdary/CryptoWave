import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  AboutUs,
  ContactUs,
  CryptoConverter,
  CryptoForecast,
  Home,
  Login,
  Markets,
  Register,
} from './views'
import { LoggedInProtection, LoggedOutProtection, Navbar } from './components'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthActions } from './store/auth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthActions.fetchUserProfileAsync())
  }, [])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/markets"
          element={
            <LoggedInProtection>
              <Markets />
            </LoggedInProtection>
          }
        />
        <Route
          path="/cryptoForecast/:symbol"
          element={
            <LoggedInProtection>
              <CryptoForecast />
            </LoggedInProtection>
          }
        />
        <Route
          path="/converter"
          element={
            <LoggedInProtection>
              <CryptoConverter />
            </LoggedInProtection>
          }
        />
        <Route
          path="/login"
          element={
            <LoggedOutProtection>
              <Login />
            </LoggedOutProtection>
          }
        />
        <Route
          path="/register"
          element={
            <LoggedOutProtection>
              <Register />
            </LoggedOutProtection>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
