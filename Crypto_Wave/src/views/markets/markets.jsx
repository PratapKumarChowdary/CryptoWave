import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MarketsActions, MarketsSelector } from "../../store/markets";

import {
  bitCoinImage,
  bnbCoinImage,
  cardanoCoinImage,
  dodgeCoinImage,
  ethereumCoinImage,
  polygonCoinImage,
  shibaInuCoinImage,
  solanaCoinImage,
  theterCoinImage,
  tronCoinImage,
  usdcCoinImage,
  xrpCoinImage,
} from "../../assets/images";
import moment from "moment";

import "./marketStyles.css";
import { useNavigate } from "react-router-dom";

const Formatted = {
  BTC: {
    name: "Bitcoin",
    image: bitCoinImage,
  },
  ETH: {
    name: "Ethereum",
    image: ethereumCoinImage,
  },
  XRP: {
    name: "Ripple",
    image: xrpCoinImage,
  },
  TRX: {
    name: "Tron",
    image: tronCoinImage,
  },
  MATIC: {
    name: "Matic Network",
    image: polygonCoinImage,
  },
  ADA: {
    name: "Cardano",
    image: cardanoCoinImage,
  },
  SHIB: {
    name: "Shiba Inu",
    image: shibaInuCoinImage,
  },
  SOL: {
    name: "Solana",
    image: solanaCoinImage,
  },
  BNB: {
    name: "BNB",
    image: bnbCoinImage,
  },
  DOGE: {
    name: "Doge Coin",
    image: dodgeCoinImage,
  },
  USDC: {
    name: "USD Coin",
    image: usdcCoinImage,
  },
  USDT: {
    name: "Tether",
    image: theterCoinImage,
  },
};

const Markets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const markets = useSelector(MarketsSelector.markets);
  const loading = useSelector(MarketsSelector.isLoading);
  const [prices, setPrices] = useState({});
  useEffect(() => {
    dispatch(MarketsActions.fetchMarketsAsync());
    const intervalId = setInterval(updatePrices, 100); // Set interval for periodic updates

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);
  // Function to update cryptocurrency prices
  const updatePrices = async () => {
    const cryptocurrencies = [
      "BTC",
      "ETH",
      "USDT",
      "DOGE",
      "SHIB",
      "BNB",
      "TRX",
      "XRP",
      "USDC",
      "ADA",
      "SOL",
      "MATIC",
    ];
    const baseCurrency = "USD";

    const apiUrl = "https://min-api.cryptocompare.com/data/pricemultifull";
    const apiKey =
      "01fb81538397a147f894532affd0e845140a9e84d898d81653be9d079049bc83";

    const fsyms = cryptocurrencies.join(",");
    const tsyms = baseCurrency;

    try {
      const response = await fetch(
        `${apiUrl}?fsyms=${fsyms}&tsyms=${tsyms}&api_key=${apiKey}`
      );
      const data = await response.json();

      console.log("API Response:", data); // Log the entire API response

      const updatedPrices = {};
      cryptocurrencies.forEach((crypto) => {
        const coinData = data.DISPLAY[crypto];
        if (coinData) {
          const price = coinData[tsyms].PRICE;
          const open = coinData[tsyms].OPEN24HOUR;
          const high = coinData[tsyms].HIGH24HOUR;
          const low = coinData[tsyms].LOW24HOUR;

          updatedPrices[crypto] = {
            price,
            open,
            high,
            low,
          };
        }
      });

      console.log("Updated Prices:", updatedPrices); // Log the updated prices

      setPrices((previousValue) => updatedPrices);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(prices);
  console.log(prices["BTC"]?.price);
  console.log(markets);
  return (
    <section className="section trend" aria-label="crypto trend" data-section>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>
        Date : {moment().format("MMMM D, YYYY")}
      </h2>
      <h3 style={{ textAlign: "center", margin: "1rem 0" }}>
        Click On Any Coin for Future Price Prediction
      </h3>
      <div className="coins-container">
        <ul className="tab-content">
          {!loading && markets ? (
            markets.map((market, index) => (
              <li
                key={index}
                onClick={() => navigate(`/cryptoForecast/${market.symbol}`)}
              >
                <div className="trend-card">
                  <div className="card-title-wrapper">
                    <img
                      src={Formatted[market.name].image}
                      width="24"
                      height="24"
                      alt="bitcoin logo"
                    />

                    <a
                      //href="./coindetail.html?coin=bitcoin&Bitcoin.webp"
                      className="card-title"
                    >
                      {Formatted[market.name].name}{" "}
                      <span className="span">{market.symbol}</span>
                    </a>
                  </div>

                  <div className="card-analytics">
                    <ul className="list-style">
                      <li>Real-Time Price: {prices[market.name]?.price}</li>
                      <li>Opening: {market.open}</li>
                      <li>Low 24h: {market.low}</li>
                      <li>High 24h: {market.high}</li>
                    </ul>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="spinnerContainer">
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Markets;
