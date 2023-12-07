import { createSlice } from '@reduxjs/toolkit'
import {
  compareMarketsAsync,
  compareMarketsAsyncBuilder,
  convertCurrencyAsync,
  convertCurrencyAsyncBuilder,
  cryptoForecastAsync,
  cryptoForecastAsyncBuilder,
  fetchMarketsAsync,
  fetchMarketsAsyncBuilder,
} from './asyncRequests'

const initialState = {
  data: [],
  loading: false,
  comparing: false,
  forecasting:false
}

export const MarketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchMarketsAsyncBuilder(builder)
    convertCurrencyAsyncBuilder(builder)
    compareMarketsAsyncBuilder(builder)
    cryptoForecastAsyncBuilder(builder)
  },
})

export const MarketsActions = {
  ...MarketsSlice.actions,
  fetchMarketsAsync,
  convertCurrencyAsync,
  compareMarketsAsync,
  cryptoForecastAsync,
}

export const MarketsReducer = MarketsSlice.reducer
