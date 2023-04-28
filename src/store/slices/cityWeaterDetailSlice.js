import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeaterDetail } from "../../services/services";

export const getWeatherDetail = createAsyncThunk(
  "weatherDetail/getWeatherDetail",
  async ([lat, lon, units]) => {
    units = "metric";
    const response = await getCityWeaterDetail(lat, lon, units);
    return response.data;
  }
);

export const cityWeatherDetailSlice = createSlice({
  name: "weatherDetail",
  initialState: {
    data: {},
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherDetail.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(getWeatherDetail.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "idle";
    });
    builder.addCase(getWeatherDetail.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = `${action.name}: ${action.error.message}`;
        console.error(action.error.stack);
      }
    });
  },
});
export default cityWeatherDetailSlice.reducer;
