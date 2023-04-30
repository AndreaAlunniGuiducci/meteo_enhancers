// 'W3sibGF0IjogNDEuODkzMzIwMywgImxvbiI6MTIuNDgyOTMyMX0sIHsibGF0IjogNTUuNzUwNDQ2MSwgImxvbiI6IDM3LjYxNzQ5NDN9LCB7ImxhdCI6IDM1LjY4MjgzODcsICJsb24iOiAxMzkuNzU5NDU0OX1d'

import { Row, Col, Container } from "react-bootstrap";
import { isEqual } from "lodash";
import plusSign from "../../icons/Plus.png";
import CityCard from "../../components/CityCard";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActualWeather } from "../../store/slices/cityWeaterSlice";
import { getCities } from "../../store/slices/savedCitiesSlice";
import { useLocationDate } from "../../customHooks/useLocatonDate";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

export default function Home() {
  const screenWidth = window.innerWidth;
  const dispatch = useDispatch();
  const actualWeatherData = useSelector((state) => state.actualWeather.data);
  const savedCitiesData = useSelector((state) => state.savedCities.data);
  const [dateLocation] = useLocationDate();
  const [cityName, setCityName] = useState("--");
  const [temperature, setTemperature] = useState("--");
  const [weatherClass, setWeatherClass] = useState("");
  const [cityTimezone, setCityTimezone] = useState(0);

  useEffect(() => {
    if (actualWeatherData.length > 0) {
      setCityName(actualWeatherData[0].name);
      setTemperature(parseInt(actualWeatherData[0].main.temp));
      setWeatherClass(actualWeatherData[0].weather[0].main);
      setCityTimezone(actualWeatherData[0].timezone * 1000);
    }
  }, [actualWeatherData]);
  useEffect(() => {
    savedCitiesData.map((coord) => {
      if (actualWeatherData.length > 0) {
        actualWeatherData.map((city) => {
          if (isEqual(coord, city.coord)) {
            dispatch(getActualWeather([coord.lat, coord.lon]));
          }
        });
      } else {
        dispatch(getActualWeather([coord.lat, coord.lon]));
      }
    });
  }, [dispatch]);
  console.log(screenWidth);
  return (
    <div className={styles.home}>
      {screenWidth < 992 ? (
        <Container>
          <div className={styles.greeting}>
            Good morning!
            <br />
            Mario
          </div>
          <div className={styles.addCity}>
            <img alt="Segno più" src={plusSign}></img> Aggiungi città
          </div>
          <Row xs={1} md={2}>
            {actualWeatherData.map((city, index) => {
              const timeZone = city.timezone * 1000;
              return (
                <Col key={index}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/detail/${btoa(JSON.stringify(city.coord))}`}
                  >
                    <CityCard
                      weatherClass={city.weather[0].main}
                      cityName={city.name}
                      temperature={city.main.temp}
                      cityDate={dateLocation(timeZone)}
                    />
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <div className={styles.desktopHome}>
          <div className={styles.topPart}>
            <div className={styles.detailCityCard}>
              <div className={`${styles.weatherCard} ${styles[weatherClass]}`}>
                <div>{temperature}°</div>
                <div className={styles.icon}></div>
              </div>
              <div
                style={{
                  height: "280px",
                  marginLeft: "56px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start;",
                }}
              >
                <div className={styles.cityName}>{cityName}</div>
                <div className={styles.cityDate}>
                  {dateLocation(cityTimezone).toLocaleDateString("en", {
                    weekday: "long",
                  })}
                  {dateLocation(cityTimezone).getDate()},{" "}
                  {dateLocation(cityTimezone).toLocaleDateString("en", {
                    month: "long",
                  })}
                </div>
                <div className={styles.cityWeather}>{weatherClass}</div>
              </div>
            </div>
            <div className={styles.citiesListCard}>
              <div className={styles.addCity}>
                <img alt="Segno più" src={plusSign}></img> Aggiungi città
              </div>
              {actualWeatherData.map((city, index) => {
                const timeZone = city.timezone * 1000;
                return (
                  <Col key={index}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/home/${btoa(JSON.stringify(city.coord))}`}
                    >
                      <CityCard
                        weatherClass={city.weather[0].main}
                        cityName={city.name}
                        temperature={city.main.temp}
                        cityDate={dateLocation(timeZone)}
                        coord={city.coord}
                        scrennWidth={screenWidth}
                      />
                    </Link>
                  </Col>
                );
              })}
            </div>
          </div>
          <div className={styles.bottomPart}>bottom</div>
        </div>
      )}
    </div>
  );
}
