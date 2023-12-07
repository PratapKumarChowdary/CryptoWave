import { createAsyncThunk } from "@reduxjs/toolkit"
import { authInstance } from "../../../axios"

export const fetchUserProfileAsync = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken")
      console.log("🚀 ~ file: fetchUserProfileAsync.js:9 ~ token:", token)

      if(!token){
        throw new Error("no token")
      }

      const req = await authInstance.get("/userProfile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const response = {...req.data,token}

      return response
    } catch (error) {
      console.log("🚀 ~ file: fetchUserProfile.js:21 ~ error:", error)
      if (error.response && error.response.status) {
        if (error.response.status === 401) {
          return rejectWithValue({ message: "Incorrect email or password" })
        }

        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ message: "unexpected error" })
    }
  }
)

export const fetchUserProfileAsyncBuilder = (builder) => {
  builder.addCase(fetchUserProfileAsync.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
    state.loading = false
    state.data = action.payload
    state.success = true
  })
  builder.addCase(fetchUserProfileAsync.rejected, (state, action) => {
    state.loading = false
    state.success = false
  })
}
