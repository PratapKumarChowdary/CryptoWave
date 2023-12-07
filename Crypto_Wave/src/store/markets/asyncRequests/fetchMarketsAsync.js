import { createAsyncThunk } from "@reduxjs/toolkit"
import { authInstance } from "../../../axios"

export const fetchMarketsAsync = createAsyncThunk(
  "markets/fetchMarkets",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        throw new Error("no token")
      }

      const response = await authInstance.get("/markets", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("🚀 ~ file: fetchMarketsAsync.js:19 ~ response:", response)

      return response.data.markets
    } catch (error) {
      return rejectWithValue({ message: "unexpected error" })
    }
  }
)

export const fetchMarketsAsyncBuilder = (builder) => {
  builder.addCase(fetchMarketsAsync.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(fetchMarketsAsync.fulfilled, (state, action) => {
    state.loading = false
    state.data = action.payload
  })
  builder.addCase(fetchMarketsAsync.rejected, (state, action) => {
    state.loading = false
  })
}
