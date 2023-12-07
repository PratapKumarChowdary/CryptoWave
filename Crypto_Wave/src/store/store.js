import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './auth'
import { MarketsReducer } from './markets'

const persistConfig = {
  key: 'root',
}

const rootReducer = combineReducers({
  auth: AuthReducer,
  markets:MarketsReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
