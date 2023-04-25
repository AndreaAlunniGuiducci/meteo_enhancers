import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getActualWeather = createAsyncThunk('actualWeather/getActualWeather', async () => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Roma,it&units=metric&lang=it&appid=0039d1890945e072a4dec1e182503d52')
  return response.data
})

export const usersSlice = createSlice({
  name: 'actualWeather',
  initialState: {
    data: {},
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActualWeather.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })
    builder.addCase(getActualWeather.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.data = action.payload
        state.loading = 'idle'
      }
    })
    builder.addCase(getActualWeather.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = 'Error occured'
      }
    })
  },
})
export default usersSlice.reducer