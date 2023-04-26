import axios from "axios";

const baseUrl = "https://api.openweathermap.org";
const APIKey = "0039d1890945e072a4dec1e182503d52";

export const getCityWeather = (lat, lon, units) => {
  return axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`);
};

export const getSavedCity = ()=>{
  return axios.get(`${baseUrl}/geo/1.0/direct?q=tokyo&limit=5&appid=${APIKey}`)
}