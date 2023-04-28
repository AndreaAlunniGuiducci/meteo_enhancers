import { configureStore } from "@reduxjs/toolkit";
import actualWeather from "./slices/cityWeaterSlice";
import savedCities from "./slices/savedCitiesSlice";
import cityWeaterDetail from "./slices/cityWeaterDetailSlice";

export const store = configureStore({
  reducer: {
    actualWeather: actualWeather,
    savedCities: savedCities,
    cityWeaterDetail: cityWeaterDetail,
  },
});
