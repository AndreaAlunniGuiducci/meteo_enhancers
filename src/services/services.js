import axios from "axios";

const baseUrl = "https://api.openweathermap.org";
const APIKey = "0039d1890945e072a4dec1e182503d52";
const cityData= "/data/2.5";
const cityCoord = "/geo/1.0/direct?";

export const getCityWeather = (lat, lon, units) => {
  return axios.get(
    `${baseUrl}${cityData}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`
  );
};

export const getCityCoord = () => {
  return axios.get(`${baseUrl}${cityCoord}q=tokyo&limit=5&appid=${APIKey}`);
};

export const getCityWeaterDetail = (lat, lon, units) => {
  return axios.get(
    `${baseUrl}${cityData}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`
  );
};
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
