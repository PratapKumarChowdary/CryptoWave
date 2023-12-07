import { createAsyncThunk } from "@reduxjs/toolkit"
import { authInstance } from "../../../axios"

export const userLoginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const req = await authInstance.post("/login", { email, password })

      const response = req.data

      localStorage.setItem("authToken", response.token)

      return response
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status) {
        if (error.response.status === 400) {
          return rejectWithValue({ message: "Incorrect email or password" })
        }

        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ message: "unexpected error" })
    }
  }
)

export const userLoginAsyncBuilder = (builder) => {
  builder.addCase(userLoginAsync.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(userLoginAsync.fulfilled, (state, action) => {
    state.loading = false
    state.data = action.payload
    state.success = true
  })
  builder.addCase(userLoginAsync.rejected, (state, action) => {
    state.loading = false
    state.success = false
  })
}
