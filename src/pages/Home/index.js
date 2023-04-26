// 'W3sibGF0IjogNDEuODkzMzIwMywgImxvbiI6MTIuNDgyOTMyMX0sIHsibGF0IjogNTUuNzUwNDQ2MSwgImxvbiI6IDM3LjYxNzQ5NDN9LCB7ImxhdCI6IDM1LjY4MjgzODcsICJsb24iOiAxMzkuNzU5NDU0OX1d'

import { Row, Col, Container } from "react-bootstrap";
import plusSign from "../../icons/Plus.png";
import CityCard from "../../components/CityCard";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActualWeather } from "../../store/slices/cityWeaterSlice";
import { getCities } from "../../store/slices/savedCitiesSlice";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const actualWeather = useSelector((state) => state.actualWeather);
  const savedCities = useSelector((state) => state.savedCities);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cityName, setCityName] = useState("--");
  const [temperature, setTemperature] = useState("--");
  const [weatherClass, setWeatherClass] = useState("");
  const [cityDate, setCityDate] = useState(new Date());

  useEffect(() => {
    setSearchParams(
      "coord=W3sibGF0IjogNDEuODkzMzIwMywgImxvbiI6MTIuNDgyOTMyMX0sIHsibGF0IjogNTUuNzUwNDQ2MSwgImxvbiI6IDM3LjYxNzQ5NDN9LCB7ImxhdCI6IDM1LjY4MjgzODcsICJsb24iOiAxMzkuNzU5NDU0OX1d"
    );
    let cities = JSON.parse(atob(searchParams.get("coord")));
    cities.map((coord) => dispatch(getActualWeather([coord.lat, coord.lon])));
    dispatch(getCities());
  }, [dispatch]);

  // useEffect(() => {
  //   debugger;
  //   if (actualWeather && actualWeather.data.length > 0) {
  //     debugger;
  //     const localGMT = new Date().getTimezoneOffset() * 60 * 1000;
  //     const timeZone = actualWeather.data.timezone * 1000;
  //     const today = Date.now();
  //     setCityName(actualWeather.data.name);
  //     setTemperature(actualWeather.data.main.temp);
  //     setWeatherClass(actualWeather.data.weather[0].main);
  //     setCityDate(new Date(localGMT + timeZone + today));
  //   }
  // }, [actualWeather]);

  console.log(actualWeather);
  return (
    <Container className={styles.home}>
      <div className={styles.greeting}>
        Good morning!
        <br />
        Mario
      </div>
      <div className={styles.addCity}>
        <img alt="Segno più" src={plusSign}></img> Aggiungi città
      </div>
      {/* <div className={styles.cityCards}> */}
      <Row xs={1} md={2}>
        {actualWeather.data.map((city, index) => {
          const localGMT = new Date().getTimezoneOffset() * 60 * 1000;
          const timeZone = city.timezone * 1000;
          const today = Date.now();
          return (
            <Col key={index}>
              <CityCard
                weatherClass={city.weather[0].main}
                cityName={city.name}
                temperature={city.main.temp}
                cityDate={new Date(localGMT + timeZone + today)}
              />
            </Col>
          );
        })}
      </Row>
      {/* </div> */}
    </Container>
  );
}
