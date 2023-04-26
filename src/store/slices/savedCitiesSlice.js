import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSavedCity } from "../../services/services";

export const getCities = createAsyncThunk("savedCities/getCities", async () => {
  const response = await getSavedCity();
  return response.data;
});

export const savedCitiesSlice = createSlice({
  name: "savedCities",
  initialState: {
    data: [],
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
        state.data = action.payload;
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
