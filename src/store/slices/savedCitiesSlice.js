import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityCoord } from "../../services/services";

export const getCities = createAsyncThunk("savedCities/getCities", async () => {
  const response = await getCityCoord();
  return response.data;
});

export const savedCitiesSlice = createSlice({
  name: "savedCities",
  initialState: {
    data: [
      { lat: 40.779897, lon: -73.968565 },
      { lat: 43.110717, lon: 12.390828 },
      { lat: 55.755826, lon: 37.6173 },
    ],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCities.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = [...state.data, action.payload];
        state.loading = "idle";
      }
    });
    builder.addCase(getCities.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = `${action.name}: ${action.error.message}`;
        console.error(action.error.stack);
      }
    });
  },
});
export default savedCitiesSlice.reducer;
