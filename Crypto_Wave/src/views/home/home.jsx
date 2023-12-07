import React from "react";
import {
  bitCoinImage,
  bnbCoinImage,
  cardanoCoinImage,
  dataAnalyticImage,
  dodgeCoinImage,
  ethereumCoinImage,
  heroImage,
  intelligenceImage,
  polygonCoinImage,
  resizedLogo,
  shibaInuCoinImage,
  solanaCoinImage,
  theterCoinImage,
  trendImage,
  tronCoinImage,
  wazirXCoinImage,
  xrpCoinImage,
} from "../../assets/images";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero">
        <div className="wrapper hero-content animate__animated animate__fadeInDown speed">
          <div className="left-col active">
            <h1>
              Harnessing the Power of AI for <span>Smarter</span> Investments
            </h1>
            <p className="subhead">
              Leveraging Deep learning to make informed investment decisions in
              real-time
            </p>

            <div className="cta-btns">
              <div className="icon-text">
                <NavLink to="/register" className="jus">
                  <i className="fa fa-user-plus fa-fade jus"></i>Join Us
                </NavLink>
              </div>
            </div>
          </div>
          <div className="right-col">
            <img
              src={heroImage}
              alt=""
              className="hero-header"
              width="600"
              height="480"
            />
          </div>
        </div>
      </section>
      <section className="features">
        <div className="wrapper">
          <ul className="animate__animated animate__fadeInUp speed">
            <li>
              <strong>
                <img src={trendImage} alt="" />
                <span>Accurate Price Predictions</span>
              </strong>
              <p>
                Harness the power of advanced machine learning algorithms to
                generate accurate price predictions for cryptocurrencies. Make
                informed investment decisions based on reliable forecasts,
                maximizing your returns in the dynamic world of digital assets.
              </p>
            </li>
            <li>
              <strong>
                <img src={intelligenceImage} alt="" />
                <span>Intelligent Investment Recommendations</span>
              </strong>
              <p>
                Unlock intelligent investment recommendations powered by
                cutting-edge algorithms. Leverage comprehensive market analysis
                and historical data to receive personalized investment
                suggestions tailored to your risk profile, maximizing your
                potential for profitable returns.
              </p>
            </li>
            <li>
              <strong>
                <img src={dataAnalyticImage} alt="" />
                <span>Real-time Market Insights</span>
              </strong>
              <p>
                Stay ahead of the curve with real-time market insights. Access
                up-to-date information, trends, and news to make informed
                investment decisions and navigate the cryptocurrency market with
                confidence.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="coins-area">
          <div>
            <div className="coins-title">
              <span className="sub-title">Included Coins</span>
            </div>
            <div className="row">
              <div className="coin-wrap">
                <ul className="animate__animated animate__fadeInUp speed">
                  <li>
                    <img src={bitCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={bnbCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={cardanoCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={dodgeCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img
                      src={ethereumCoinImage}
                      alt=""
                      width="64"
                      height="64"
                    />
                  </li>
                  <li>
                    <img
                      src={shibaInuCoinImage}
                      alt=""
                      width="64"
                      height="64"
                    />
                  </li>
                  <li>
                    <img src={solanaCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={theterCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={tronCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={wazirXCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={xrpCoinImage} alt="" width="64" height="64" />
                  </li>
                  <li>
                    <img src={polygonCoinImage} alt="" width="64" height="64" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="wrapper">
          <div className="footer-header">
            <h3>CryptoWave</h3>
            <p>Effective Investment Management</p>
            <ul className="socials">
              <li>
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="footer-bottom">
            <p>Copyright &copy;2023 CryptoWave</p>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Home;
