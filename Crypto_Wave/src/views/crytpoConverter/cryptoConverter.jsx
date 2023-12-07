import React, { useState } from 'react'
import { Form, Spinner, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { MarketsActions, MarketsSelector } from '../../store/markets'
import { CompareCrypto } from './subComponents'

const { Select } = Form

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

const CryptoConverter = () => {
  const dispatch = useDispatch()

  const [currencyInputs, setCurrencyInputs] = useState({
    cryptoSymbol: 'BTC-USD',
    amount: 0,
  })
  const [currencyOutputs, setCurrencyOutputs] = useState({
    usd: '',
    eur: '',
    inr: '',
  })

  const loading = useSelector(MarketsSelector.isLoading)

  const handleChange = (e) => {
    const { value, name } = e.target

    const v = name === 'amount' ? parseInt(value) : value
    setCurrencyInputs((prev) => ({ ...prev, [name]: v }))
  }

  const handleConvert = async () => {
    if (!currencyInputs.cryptoSymbol || !currencyInputs.cryptoSymbol) {
      return
    }

    const resultAction = await dispatch(MarketsActions.convertCurrencyAsync(currencyInputs))

    if (MarketsActions.convertCurrencyAsync.rejected.match(resultAction)) {
      console.log('error')
    } else {
      setCurrencyOutputs(resultAction.payload)
    }
  }

  return (
    <div>
      <CompareCrypto />
      <Container style={{ padding: '3rem',margin:"4rem auto" }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>Convert Crypto Currency</h2>

        <div style={{ margin: '3rem 0' }}>
          <Form style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Currency</Form.Label>
              <Select
                style={{ minWidth: '300px', height: '40px', fontSize: '1.5rem' }}
                name="cryptoSymbol"
                onChange={handleChange}
              >
                {Symbols.map((symbol, index) => (
                  <option key={index} value={symbol.symbol}>
                    {symbol.name}
                  </option>
                ))}
              </Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                onChange={handleChange}
                style={{ maxWidth: '300px', height: '40px', fontSize: '1.5rem' }}
              />
            </Form.Group>
          </Form>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="login-btn"
              style={{ borderRadius: '8px', fontSize: '1.2rem' }}
              onClick={handleConvert}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Convert'
              )}
            </button>
          </div>

          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}
          >
            <Form.Group>
              <Form.Label style={{ fontSize: '1.2rem' }}>USD</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={currencyOutputs.usd}
                style={{ maxWidth: '200px', height: '40px', fontSize: '1.5rem' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontSize: '1.2rem' }}>EUR</Form.Label>
              <Form.Control
                type="text"
                value={currencyOutputs.eur}
                readOnly
                style={{ maxWidth: '200px', height: '40px', fontSize: '1.5rem' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontSize: '1.2rem' }}>INR</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={currencyOutputs.inr}
                style={{ maxWidth: '200px', height: '40px', fontSize: '1.5rem' }}
              />
            </Form.Group>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CryptoConverter
