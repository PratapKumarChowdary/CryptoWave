import { createSelector } from '@reduxjs/toolkit'

const userId = (state) => state.auth.data._id || ''
const isLoading = (state) => state.auth.loading
const isSuccess = (state) => state.auth.success
const authToken = (state) => state.auth.data.token || ''
const isLoggedIn = (state)=> state.auth.success

export const AuthSelector = {
  userId,
  isLoading,
  isSuccess,
  authToken,
  isLoggedIn
}