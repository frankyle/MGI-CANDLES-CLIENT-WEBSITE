// store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/authSlice'  // Example reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slice reducers here
    // Add more reducers if you have more slices
  },
})

export default store
