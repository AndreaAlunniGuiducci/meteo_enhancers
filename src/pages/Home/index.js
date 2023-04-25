import { Row, Col, Container } from "react-bootstrap";
import plusSign from "../../icons/Plus.png";
import CityCard from "../../components/CityCard";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActualWeather } from "../../store/slices/prova";

export default function Home() {
  const dispatch = useDispatch();
  const actualWeather = useSelector((state) => state.actualWeather);
  const [cityName, setCityName] = useState("--");
  const [temperature, setTemperature] = useState("--");
  const [weatherClass, setWeatherClass] = useState("");
  useEffect(() => {
    dispatch(getActualWeather());
  }, [dispatch]);
  useEffect(() => {
    if (actualWeather && Object.keys(actualWeather.data).length > 0) {
      debugger;
      setCityName(actualWeather.data.name);
      setTemperature(actualWeather.data.main.temp);
      setWeatherClass(actualWeather.data.weather[0].main);
    }
  }, [actualWeather]);
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
        <Col>
          <CityCard
            weatherClass={weatherClass}
            cityName={cityName}
            temperature={temperature}
          />
        </Col>
        <Col>
          <CityCard weatherClass={"sunny"} />
        </Col>
        <Col>
          <CityCard weatherClass={"cloudy"} />
        </Col>
      </Row>
      {/* </div> */}
    </Container>
  );
}
