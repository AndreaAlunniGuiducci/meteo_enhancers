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
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
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
  const [dayList, setDayList] = useState([]);
  const [desktopCity, setDesktopCity] = useState([]);
  const [weaterDetail, setWeatherDetail] = useState("--");
  const [maxTemp, setMaxTemp] = useState("--");
  const [minTemp, setMinTemp] = useState("--");
  const [tempFeel, setTempFeel] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [selectedCityName, setSelctedCityName] = useState("--");

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const screenWidthEvent = e.target.innerWidth;
      setscreenWidth(screenWidthEvent);
    });
  }, []);
  useEffect(() => {
    const stringCoord = location.pathname.slice(6, location.pathname.length);
    if (stringCoord.trim() !== "") {
      const coord = JSON.parse(atob(stringCoord));
      dispatch(getWeatherDetail([coord.lat, coord.lon]));
    }
  }, [location]);

  useEffect(() => {
    if (Object.keys(weatherDetailData).length > 0) {
      const city = weatherDetailData.city;
      const list = weatherDetailData.list;
      const dayListArray = [];
      list.map((day) => {
        if (day.dt_txt.slice(11, 13) === "00") {
          dayListArray.push(day);
        }
      });
      setTimeZone(city.timezone * 1000);
      setCityName(city.name);
      setTemperature(parseInt(list[0].main.temp));
      setWeatherClass(list[0].weather[0].main);
      setWeatherList(list);
      setSelectedCity(city.id);
      setDayList(dayListArray);
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
      setSelectedCity(actualWeatherData[0].id);
      dispatch(
        getWeatherDetail([
          actualWeatherData[0].coord.lat,
          actualWeatherData[0].coord.lon,
        ])
      );
    }
    if (selectedCity) {
      const filteredCity = actualWeatherData.filter(
        (city) => city.id !== selectedCity
      );
      const citySelected = actualWeatherData.find(
        (city) => city.id === selectedCity
      );
      if (citySelected) {
        setDesktopCity(filteredCity);
        setCityName(citySelected.name);
        setTemperature(parseInt(citySelected.main.temp));
        setWeatherClass(citySelected.weather[0].main);
        setCityTimezone(citySelected.timezone * 1000);
        setWeatherDetail(citySelected.weather[0].description);
        setMaxTemp(parseInt(citySelected.main.temp_max));
        setMinTemp(parseInt(citySelected.main.temp_min));
        setHumidity(citySelected.main.humidity);
        setTempFeel(parseInt(citySelected.main.feels_like));
      }
    }
  }, [actualWeatherData, selectedCity]);

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
  const searchCity = (e) => {
    if (e.key === "Enter" || e.type === 'click') {
      if (selectedCityName.trim() !== "") {
        const citySearched = desktopCity.filter((city) =>
          city.name.toUpperCase().includes(selectedCityName.toUpperCase())
        );
        setDesktopCity(citySearched);
      } else {
        const filteredCity = actualWeatherData.filter(
          (city) => city.id !== selectedCity
        );
        setDesktopCity(filteredCity);
      }
    }
  };
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
              <div className={styles.citiesCard}>
                {desktopCity.map((city, index) => {
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
                            {dayList.map((day, index) => {
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
                            {dayList.map((day, index) => {
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
                  <Tab eventKey="month" title="This month">
                    <div className={styles.weekDetail}>
                      <div
                        className={`${styles.monthDetail} ${styles[weatherClass]}`}
                      >
                        <div className={styles.dateIcon}>
                          <div className={styles.day}>
                            {dateLocation(cityTimezone).toLocaleDateString(
                              "en",
                              {
                                weekday: "short",
                              }
                            )}
                            , {dateLocation(cityTimezone).getDate()}{" "}
                            {dateLocation(cityTimezone).toLocaleDateString(
                              "en",
                              {
                                month: "long",
                              }
                            )}
                          </div>
                          <div className={styles.icon}></div>
                        </div>
                        <div className={styles.detail}>
                          <div className={styles.temperature}>
                            {temperature}°
                          </div>
                          <div className={styles.weatherDetail}>
                            {weaterDetail}
                          </div>
                          <div className={styles.minMaxTemp}>
                            The high will be {maxTemp}°C, the low will be{" "}
                            {minTemp}°C.
                          </div>
                          <div className={styles.otherDetail}>
                            Humidity: {humidity}% <br />
                            Perceived temperature: {tempFeel}°
                          </div>
                        </div>
                      </div>
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
                    onChange={(e) => {
                      setSelctedCityName(e.target.value);
                    }}
                    onKeyDown={searchCity}
                  />
                  <Button variant="outline-secondary" onClick={searchCity}>
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
