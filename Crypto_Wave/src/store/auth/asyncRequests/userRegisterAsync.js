import { createAsyncThunk } from "@reduxjs/toolkit"
import { authInstance } from "../../../axios"

export const userRegisterAsync = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password }, _) => {
  const res =  await authInstance.post("/register", {
      firstName,
      lastName,
      email,
      password
    })
    return res.data
  }
)

export const userRegisterAsyncBuilder = (builder) => {
  builder.addCase(userRegisterAsync.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
    state.loading = false
  })
  builder.addCase(userRegisterAsync.rejected, (state, action) => {
    state.loading = false
  })
}
