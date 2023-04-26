import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeather } from "../../services/services";

export const getActualWeather = createAsyncThunk(
  "actualWeather/getActualWeather",
  async ([lat, lon, units]) => {
    units = "metric";
    const response = await getCityWeather(lat, lon, units);
    return response.data;
  }
);

export const cityWeatherSlice = createSlice({
  name: "actualWeather",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActualWeather.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(getActualWeather.fulfilled, (state, action) => {
        debugger
        state.data = [...state.data, action.payload];
        state.loading = "idle";
    });
    builder.addCase(getActualWeather.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = `${action.name}: ${action.error.message}`;
        console.error(action.error.stack);
      }
    });
  },
});
export default cityWeatherSlice.reducer;
