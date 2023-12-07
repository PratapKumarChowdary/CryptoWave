import React from "react"
import { resizedLogo } from "../../assets/images"
import { useNavigate } from "react-router-dom"
import "./aboutUsStyles.css"

const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <section class="about animate__animated animate__fadeInUp speed">
      <div class="content">
        <img src={resizedLogo} />
        <div class="text">
          <h1>About Us</h1>
          <h5>CryptoWave - Effective Investment Management</h5>
          <p>
            At CryptoWave, we are dedicated to revolutionizing the way
            cryptocurrency investors make informed investment decisions. Our
            cutting-edge platform leverages advanced machine learning algorithms
            and data analysis techniques to predict future cryptocurrency prices
            with accuracy and precision.
          </p>
          <hr />
          <h5>Our Mission</h5>
          <p>
            Our mission is to empower cryptocurrency investors by providing them
            with a reliable and effective investment management tool. We aim to
            eliminate the guesswork and uncertainties associated with
            cryptocurrency trading, enabling investors to make well-informed
            decisions based on accurate price predictions.
          </p>
          <hr />

          <h5>How CryptoWave Works</h5>
          <p>
            At CryptoWave, we have developed a sophisticated model that takes
            into account various factors such as historical price trends, and
            technical indicators. This model continuously learns and adapts to
            changing market conditions, ensuring that our price predictions are
            reliable and up-to-date.
          </p>

          <a>
            <button class="about-btn" onClick={() => navigate("/register")}>
              Join Us
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
