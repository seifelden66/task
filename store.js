// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})
