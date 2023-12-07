import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MarketsActions, MarketsSelector } from "../../store/markets";
import { useSnackbar } from "notistack";
import { ForecastingGraph } from "./subComponents";
import { Form, Spinner, Container } from "react-bootstrap";

const CryptoForecast = () => {
  const dispatch = useDispatch();
  const { symbol = "" } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [graphData, setGraphData] = useState(null);
  const [frequency, setFrequency] = useState("daily");

  const loading = useSelector(MarketsSelector.isForecasting);
  console.log(
    "🚀 ~ file: cryptoForecast.jsx:18 ~ CryptoForecast ~ loading:",
    loading
  );

  useEffect(() => {
    forecast(symbol, frequency);
  }, [symbol, frequency]);

  const forecast = async (symbol, frequency = "daily") => {
    if (symbol) {
      const resultAction = await dispatch(
        MarketsActions.cryptoForecastAsync({ cryptoSymbol: symbol, frequency })
      );

      if (MarketsActions.cryptoForecastAsync.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        setGraphData(data);
      } else {
        enqueueSnackbar("error while generating data", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  return (
    <div className="wrapper" style={{ flexDirection: "column" }}>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>{symbol}</h2>
        <Form
          style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
        >
          <Form.Group style={{ margin: "2rem" }}>
            <Form.Label style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Select Period
            </Form.Label>
            <Form.Select
              name="period"
              onChange={(e) => setFrequency(e.target.value)}
              style={{ minWidth: "300px", height: "40px", fontSize: "1.5rem" }}
            >
              {["daily", "monthly"].map((period, index) => (
                <option key={index} value={period}>
                  {period}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div className="spinnerContainer">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
          </div>
        ) : (
          <ForecastingGraph data={graphData} />
        )}
      </Container>
    </div>
  );
};

export default CryptoForecast;
