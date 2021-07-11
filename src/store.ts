import { configureStore } from '@reduxjs/toolkit'
import conversationReducer from './state/reducers/conversationReducer'
import userReducer from './state/reducers/userReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
