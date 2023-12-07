import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MarketsActions, MarketsSelector } from '../../../store/markets'
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { CryptoComparisonGraph } from './cryptoComparisonGraph'
import { useSnackbar } from 'notistack'

const Symbols = [
  {
    symbol: 'BTC-USD',
    name: 'BTC',
  },
  {
    symbol: 'ETH-USD',
    name: 'ETH',
  },
  {
    symbol: 'XRP-USD',
    name: 'XRP',
  },
  {
    symbol: 'TRX-USD',
    name: 'TRX',
  },
  {
    symbol: 'MATIC-USD',
    name: 'MATIC',
  },
  {
    symbol: 'ADA-USD',
    name: 'ADA',
  },
  {
    symbol: 'SHIB-USD',
    name: 'SHIB',
  },
  {
    symbol: 'SOL-USD',
    name: 'SOL',
  },
  {
    symbol: 'BNB-USD',
    name: 'BNB',
  },
  {
    symbol: 'DOGE-USD',
    name: 'DOGE',
  },
  {
    symbol: 'USDC-USD',
    name: 'USDC',
  },
  {
    symbol: 'USDT-USD',
    name: 'USDT',
  },
]

const periods = [
  {
    title: '1 Day',
    value: '1d',
  },
  {
    title: '5 Days',
    value: '5d',
  },
  {
    title: '1 Month',
    value: '1mo',
  },
  {
    title: '3 Months',
    value: '3mo',
  },
  {
    title: '6 Months',
    value: '6mo',
  },
]

export const CompareCrypto = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [comparisonData, setComparisonData] = useState({})
  const [selectedCurrencies, setSelectedCurrencies] = useState(['BTC-USD'])

  const loading = useSelector(MarketsSelector.isComparing)

  const handleSelectedCurrencies = (symbol) => {
    if (selectedCurrencies.includes(symbol)) {
      setSelectedCurrencies(
        selectedCurrencies.filter((selectedSymbol) => selectedSymbol !== symbol),
      )
    } else {
      setSelectedCurrencies([...selectedCurrencies, symbol])
    }
  }

  const handleCompare = async (period = '1d') => {
    if (selectedCurrencies.length) {
      const resultAction = await dispatch(
        MarketsActions.compareMarketsAsync({ period, symbols: selectedCurrencies }),
      )

      if (MarketsActions.compareMarketsAsync.fulfilled.match(resultAction)) {
        setComparisonData(resultAction.payload.markets)
      } else {
        enqueueSnackbar('error while generating comparison data', {
          variant: 'error',
          autoHideDuration: 3000,
        })
      }
    }
  }

  return (
    <div className="wrapper" style={{ display: 'flex', alignItems: 'center' }}>
      <Row style={{ width: '100%' }}>
        <Col xs={9}>
          {!!Object.keys(comparisonData).length ? (
            <div>
              <CryptoComparisonGraph data={comparisonData} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                {periods.map((period, index) => (
                  <button
                    className="login-btn"
                    key={index}
                    style={{ borderRadius: '8px', fontSize: '1.2rem', minWidth: '100px' }}
                    onClick={() => handleCompare(period.value)}
                  >
                    {period.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <h1 style={{color:"GrayText"}}>Click compare to see comparison</h1>
            </div>
          )}
        </Col>
        <Col xs={3}>
          <Card style={{ padding: '1rem' }}>
            <Card.Header style={{ background: 'transparent', border: 'none' }}>
              <h3 style={{ textAlign: 'center' }}>Select Currencies</h3>
            </Card.Header>
            <Card.Body>
              {Symbols.map(({ name, symbol }) => (
                <div key={name}>
                  <Form.Check
                    label={name}
                    value={symbol}
                    style={{ fontSize: '2rem' }}
                    checked={selectedCurrencies.includes(symbol)}
                    onChange={() => handleSelectedCurrencies(symbol)}
                  />
                </div>
              ))}
            </Card.Body>
            <Card.Footer style={{ background: 'transparent', border: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="login-btn"
                  style={{ borderRadius: '8px', fontSize: '1.2rem' }}
                  onClick={() => handleCompare()}
                >
                  Compare
                </button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
