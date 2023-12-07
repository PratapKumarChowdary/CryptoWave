import { createAsyncThunk } from "@reduxjs/toolkit"
import { marketInstance } from "../../../axios"

export const convertCurrencyAsync = createAsyncThunk(
  "markets/convertCurrency",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        throw new Error("no token")
      }

      const response = await marketInstance.post("/convertCurrency",data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("🚀 ~ file: fetchMarketsAsync.js:19 ~ response:", response)

      return response.data
    } catch (error) {
      return rejectWithValue({ message: "unexpected error" })
    }
  }
)

export const convertCurrencyAsyncBuilder = (builder) => {
  builder.addCase(convertCurrencyAsync.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(convertCurrencyAsync.fulfilled, (state, action) => {
    state.loading = false
  })
  builder.addCase(convertCurrencyAsync.rejected, (state, action) => {
    state.loading = false
  })
}
