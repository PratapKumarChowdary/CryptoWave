import { createSlice } from "@reduxjs/toolkit"
import {
  userLoginAsync,
  userLoginAsyncBuilder,
  userRegisterAsync,
  userRegisterAsyncBuilder,
  fetchUserProfileAsync,
  fetchUserProfileAsyncBuilder
} from "./asyncRequests"

const initialState = {
  data: {},
  loading: false,
  success: false
}

export const UserAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken")
      return initialState
    }
  },
  extraReducers: (builder) => {
    userLoginAsyncBuilder(builder)
    userRegisterAsyncBuilder(builder)
    fetchUserProfileAsyncBuilder(builder)
  }
})

export const AuthActions = {
  ...UserAuthSlice.actions,
  userLoginAsync,
  userRegisterAsync,
  fetchUserProfileAsync
}

export const AuthReducer = UserAuthSlice.reducer
