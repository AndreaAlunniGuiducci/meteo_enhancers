import searchIcon from "../../icons/Search_white.png";
import locationIcon from "../../icons/Location_white.png";

import {
  Row,
  Col,
  Container,
  Nav,
  Tabs,
  Tab,
  Carousel,
  CarouselItem,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { isEqual } from "lodash";
import plusSign from "../../icons/Plus.png";
import CityCard from "../../components/CityCard";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActualWeather } from "../../store/slices/cityWeaterSlice";
import { getCities } from "../../store/slices/savedCitiesSlice";
import { useLocationDate } from "../../customHooks/useLocatonDate";
import { Link, useLocation } from "react-router-dom";
import HoursDetail from "../../components/HoursDetail";
import { getWeatherDetail } from "../../store/slices/cityWeaterDetailSlice";
import DayDetailCard from "../../components/DayDetailCard";

export default function Home() {
  const screenWidth = window.innerWidth;
  const dispatch = useDispatch();
  const weatherDetailData = useSelector((state) => state.cityWeaterDetail.data);
  const actualWeatherData = useSelector((state) => state.actualWeather.data);
  const savedCitiesData = useSelector((state) => state.savedCities.data);
  const [dateLocation] = useLocationDate();
  const location = useLocation();
  const [cityName, setCityName] = useState("--");
  const [temperature, setTemperature] = useState("--");
  const [weatherClass, setWeatherClass] = useState("");
  const [cityTimezone, setCityTimezone] = useState(0);
  const [weaterList, setWeatherList] = useState([]);
  const [timeZone, setTimeZone] = useState(0);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    console.log(location);
    const stringCoord = location.pathname.slice(6, location.pathname.length);
    if (stringCoord.trim() !== "") {
      const coord = JSON.parse(atob(stringCoord));
      dispatch(getWeatherDetail([coord.lat, coord.lon]));
    }
  }, [location]);
  console.log(weatherDetailData);
  useEffect(() => {
    if (Object.keys(weatherDetailData).length > 0) {
      const city = weatherDetailData.city;
      const list = [];
      weatherDetailData.list.map((day) => {
        if (day.dt_txt.slice(11, 13) === "00") {
          list.push(day);
        }
      });
      setTimeZone(city.timezone * 1000);
      setCityName(city.name);
      setTemperature(parseInt(list[0].main.temp));
      setWeatherClass(list[0].weather[0].main);
      setWeatherList(list);
      setSelectedCity(city.id);
    }
  }, [weatherDetailData]);

  useEffect(() => {
    if (actualWeatherData.length > 0) {
      setCityName(actualWeatherData[0].name);
      setTemperature(parseInt(actualWeatherData[0].main.temp));
      setWeatherClass(actualWeatherData[0].weather[0].main);
      setCityTimezone(actualWeatherData[0].timezone * 1000);
    }
    if (actualWeatherData.length === 1 && !selectedCity) {
      setSelectedCity(actualWeatherData[0].name);
      dispatch(
        getWeatherDetail([
          actualWeatherData[0].coord.lat,
          actualWeatherData[0].coord.lon,
        ])
      );
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
                  justifyContent: "flex-start",
                }}
              >
                <div className={styles.cityName}>{cityName}</div>
                <div className={styles.cityDate}>
                  {dateLocation(cityTimezone).toLocaleDateString("en", {
                    weekday: "long",
                  })}{" "}
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
          <div className={styles.bottomPart}>
            <div className={styles.hoursDetail}>
              <div style={{ marginBottom: "30px" }}>Today</div>
              <div className={styles.hoursPoint}>
                <HoursDetail
                  weaterList={weaterList}
                  temperature={temperature}
                  timeZone={timeZone}
                />
              </div>
            </div>
            <div className={styles.daysDetail}>
              <div>
                <Tabs defaultActiveKey="week" id="week-month-tabs">
                  <Tab eventKey="week" title="This week">
                    <div className={styles.weekDetail}>
                      <Carousel prevIcon={null} nextIcon={null}>
                        <Carousel.Item>
                          <div className={styles.detailCardPagination}>
                            {weaterList.map((day, index) => {
                              if (index < 3) {
                                const dateDetail = dateLocation(
                                  timeZone,
                                  new Date(day.dt * 1000).getTime()
                                );
                                const dayName = dateDetail.toLocaleDateString(
                                  "en",
                                  {
                                    weekday: "long",
                                  }
                                );
                                return (
                                  <DayDetailCard
                                    key={index}
                                    temperature={parseInt(day.main.temp)}
                                    weatherClass={day.weather[0].main}
                                    dayName={dayName}
                                  />
                                );
                              }
                            })}
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className={styles.detailCardPagination}>
                            {weaterList.map((day, index) => {
                              if (index > 2) {
                                const dateDetail = dateLocation(
                                  timeZone,
                                  new Date(day.dt * 1000).getTime()
                                );
                                const dayName = dateDetail.toLocaleDateString(
                                  "en",
                                  {
                                    weekday: "long",
                                  }
                                );
                                return (
                                  <DayDetailCard
                                    key={index}
                                    temperature={parseInt(day.main.temp)}
                                    weatherClass={day.weather[0].main}
                                    dayName={dayName}
                                  />
                                );
                              }
                            })}
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    </div>
                  </Tab>
                  <Tab eventKey="month" title="This month" disabled>
                    <div className={styles.weekDetail}>
                      <Carousel prevIcon={null} nextIcon={null}>
                        <div className={styles.detailCardPagination}>
                          {weaterList.map((day, index) => {
                            const dateDetail = dateLocation(
                              timeZone,
                              new Date(day.dt * 1000).getTime()
                            );
                            const dayName = dateDetail.toLocaleDateString(
                              "en",
                              {
                                weekday: "long",
                              }
                            );
                            return <Carousel.Item key={index}></Carousel.Item>;
                          })}
                        </div>
                      </Carousel>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div className={styles.searchLocalization}>
              <div className={styles.search}>
                Search
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="ex.Miami"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    size="lg"
                  />
                  <Button variant="outline-secondary">
                    <img src={searchIcon}></img>
                  </Button>
                </InputGroup>
              </div>
              <div className={styles.localization}>
                Localization
                <Button>
                  {" "}
                  <img src={locationIcon}></img> Add localization{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
