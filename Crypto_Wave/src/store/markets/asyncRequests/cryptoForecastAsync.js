import { createAsyncThunk } from '@reduxjs/toolkit'
import { marketInstance } from '../../../axios'

export const cryptoForecastAsync = createAsyncThunk(
  'markets/cryptoForecast',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken')

      if (!token) {
        throw new Error('no token')
      }

      const response = await marketInstance.post('/cryptoForecast', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('🚀 ~ file: fetchMarketsAsync.js:19 ~ response:', response)

      return response.data
    } catch (error) {
      return rejectWithValue({ message: 'unexpected error' })
    }
  },
)

export const cryptoForecastAsyncBuilder = (builder) => {
  builder.addCase(cryptoForecastAsync.pending, (state, action) => {
    state.forecasting = true
  })
  builder.addCase(cryptoForecastAsync.fulfilled, (state, action) => {
    state.forecasting = false
  })
  builder.addCase(cryptoForecastAsync.rejected, (state, action) => {
    state.forecasting = false
  })
}
