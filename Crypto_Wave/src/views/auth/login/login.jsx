import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AuthActions, AuthSelector } from "../../../store/auth"
import { Spinner } from "react-bootstrap"
import "../authStyles.css"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const loading = useSelector(AuthSelector.isLoading)

  const handleLogin = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email || !password) {
      console.log("inavlid inputs")
      return
    }

    const resultAction = await dispatch(
      AuthActions.userLoginAsync({ email, password })
    )

    if (AuthActions.userLoginAsync.fulfilled.match(resultAction)) {
      navigate("/")
    } else {
    }
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form id="user-login">
          <h1>Sign in</h1>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            id="password"
            className="ntg"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <p id="message"></p>
          <button className="login-btn" onClick={handleLogin}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Login"
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
              Dont have an account? <br /> Join us now
            </p>
            <a>
              {" "}
              <button
                className="ghost"
                id="signUp"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
