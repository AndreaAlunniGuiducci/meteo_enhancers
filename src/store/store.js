import { configureStore } from '@reduxjs/toolkit'
import prova from './slices/prova'

export const store = configureStore({
  reducer: {
    prova: prova
  },
})