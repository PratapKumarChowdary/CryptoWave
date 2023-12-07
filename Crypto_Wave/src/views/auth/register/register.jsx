import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AuthActions, AuthSelector } from "../../../store/auth"
import { Spinner } from "react-bootstrap"
import "../authStyles.css"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const confirmPassRef = useRef(null)

  const loading = useSelector(AuthSelector.isLoading)

  const handleRegisterUser = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value
    const firstName = emailRef.current.value
    const lastName = passwordRef.current.value

    if (!email || !password || !firstName || !lastName) {
      console.log("inavlid inputs")
      return
    }

    const resultAction = await dispatch(
      AuthActions.userRegisterAsync({ email, password, firstName, lastName })
    )

    if (AuthActions.userLoginAsync.rejected.match(resultAction)) {
      console.log("registration error")
    } else {
      navigate("/login")
    }
  }

  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form id="user-register">
            <h1 className="title-register">Register Here</h1>

            <div className="names">
              <input
                type="text"
                //onkeydown="return /[a-z]/i.test(event.key)"
                id="firstname"
                placeholder="First Name"
                required
                ref={firstNameRef}
              />
              <input
                type="text"
                //onkeydown="return /[a-z]/i.test(event.key)"
                id="lastname"
                placeholder="Last Name"
                required
                ref={lastNameRef}
              />
            </div>

            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              ref={emailRef}
            />
            <input
              type="password"
              id="password1"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <p
              style={{ fontSize: "12px", marginTop: "5px", color: "darkcyan" }}
            >
              Atleast one digit, one special character, and be 8-16 characters
              long.
            </p>

            <input
              type="password"
              id="password2"
              placeholder="Confirm Password"
              required
              ref={confirmPassRef}
            />
            <p style={{ color: "green" }} id="pss"></p>
            <p
              id="message"
              style={{ fontSize: "12px", marginTop: "5px", color: "red" }}
            ></p>
            <button onClick={handleRegisterUser} className="register-btn">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "SignUp"
              )}
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello friend!</h1>
              <p>Login to your account</p>
              <button className="ghost" id="signIn">
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>
                Already Having an Account? <br />
                Login Now!
              </p>
              <a>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => navigate("/login")}
                >
                  Login In
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
