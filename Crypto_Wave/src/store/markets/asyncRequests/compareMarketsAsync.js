import { createAsyncThunk } from "@reduxjs/toolkit"
import { marketInstance } from "../../../axios"

export const compareMarketsAsync = createAsyncThunk(
  "markets/compare",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        throw new Error("no token")
      }

      const response = await marketInstance.post("/markets/compare",data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data
    } catch (error) {
      return rejectWithValue({ message: "unexpected error" })
    }
  }
)

export const compareMarketsAsyncBuilder = (builder) => {
  builder.addCase(compareMarketsAsync.pending, (state, action) => {
    state.comparing = true
  })
  builder.addCase(compareMarketsAsync.fulfilled, (state, action) => {
    state.comparing = false
  })
  builder.addCase(compareMarketsAsync.rejected, (state, action) => {
    state.comparing = false
  })
}
