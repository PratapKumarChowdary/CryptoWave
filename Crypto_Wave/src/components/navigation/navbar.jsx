import React from "react";
import { resizedLogo } from "../../assets/images";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions, AuthSelector } from "../../store/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthSelector.isLoggedIn);

  return (
    <header>
      <div className="wrapper navbar responsive">
        <a href="#" className="logo">
          <img src={resizedLogo} alt="CrytoWave Logo" width="200" height="50" />
        </a>

        <nav>
          <ul>
            <li>
              <NavLink to="/" className="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/markets" className="active">
                Markets
              </NavLink>
            </li>
            <li>
              <NavLink to="/converter" className="active">
                Compare Crypto
              </NavLink>
            </li>
          </ul>
        </nav>
        <>
          {isLoggedIn ? (
            <a>
              <button
                className="right-button"
                onClick={() => dispatch(AuthActions.logout())}
              >
                Logout
              </button>
            </a>
          ) : (
            <a>
              <button
                className="right-button"
                onClick={() => navigate("/login")}
              >
                Login / Sign Up
              </button>
            </a>
          )}
        </>
      </div>
    </header>
  );
};

export default Navbar;
