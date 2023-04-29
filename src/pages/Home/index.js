// 'W3sibGF0IjogNDEuODkzMzIwMywgImxvbiI6MTIuNDgyOTMyMX0sIHsibGF0IjogNTUuNzUwNDQ2MSwgImxvbiI6IDM3LjYxNzQ5NDN9LCB7ImxhdCI6IDM1LjY4MjgzODcsICJsb24iOiAxMzkuNzU5NDU0OX1d'

import { Row, Col, Container } from "react-bootstrap";
import { isEqual } from "lodash";
import plusSign from "../../icons/Plus.png";
import CityCard from "../../components/CityCard";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActualWeather } from "../../store/slices/cityWeaterSlice";
import { getCities } from "../../store/slices/savedCitiesSlice";
import { useLocationDate } from "../../customHooks/useLocatonDate";
import Loading from "../../components/Loading";

export default function Home() {
  const screenWidth = window.innerWidth;
  const dispatch = useDispatch();
  const actualWeatherData = useSelector((state) => state.actualWeather.data);
  const savedCitiesData = useSelector((state) => state.savedCities.data);
  const [dateLocation] = useLocationDate();

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
                  <CityCard
                    weatherClass={city.weather[0].main}
                    cityName={city.name}
                    temperature={city.main.temp}
                    cityDate={dateLocation(timeZone)}
                    coord={city.coord}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <div className={styles.desktopHome}>
          <div className={styles.topPart}>
            <div className={styles.detailCityCard}>
              <div
                className={`${styles.weatherCard} ${
                  styles[
                    actualWeatherData.length > 0
                      ? actualWeatherData[0].weather[0].main
                      : ""
                  ]
                }`}
              >
                <div>{actualWeatherData.length > 0 ? parseInt(actualWeatherData[0].main.temp) : '--'} °</div>
                <div className={styles.icon}></div>
              </div>
            </div>
            <div className={styles.citiesListCard}></div>
          </div>
          <div className={styles.bottomPart}>bottom</div>
        </div>
      )}
    </div>
  );
}
