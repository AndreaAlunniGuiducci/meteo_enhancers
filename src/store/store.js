import { configureStore } from '@reduxjs/toolkit'
import actualWeather from './slices/prova'

export const store = configureStore({
  reducer: {
    actualWeather: actualWeather
  },
})