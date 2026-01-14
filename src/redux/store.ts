import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './globalSlice'

const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const globalSelector = (state: RootState) => state.global

export default store
