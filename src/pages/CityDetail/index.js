import { useLocation, useNavigate } from "react-router-dom";
import DayDetailCard from "../../components/DayDetailCard";
import back from "../../icons/Arrow-Left.png";
import plus from "../../icons/White-Plus.png";
import styles from "./CityDetail.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherDetail } from "../../store/slices/cityWeaterDetailSlice";
import { useLocationDate } from "../../customHooks/useLocatonDate";

export default function CityDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const weatherDetailData = useSelector((state) => state.cityWeaterDetail.data);
  const [weaterList, setWeatherList] = useState([]);
  const [cityName, setCityName] = useState("--");
  const [temperature, setTemperature] = useState("--");
  const [weatherClass, setWeatherClass] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeZone, setTimeZone] = useState(0);
  const [dateLocation] = useLocationDate();

  useEffect(() => {
    let indexOfSlash = location.pathname.lastIndexOf("/") + 1;
    let coordString = location.pathname.slice(
      indexOfSlash,
      location.pathname.length
    );
    try {
      let coord = JSON.parse(atob(coordString));
      dispatch(getWeatherDetail([coord.lat, coord.lon]));
    } catch (e) {
      console.error(e);
      navigate("/home");
    }
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(weatherDetailData).length > 0) {
      const city = weatherDetailData.city;
      const list = weatherDetailData.list;
      setTimeZone(city.timezone * 1000);
      setDate(dateLocation(timeZone));
      setCityName(city.name);
      setTemperature(parseInt(list[0].main.temp));
      setWeatherClass(list[0].weather[0].main);
      setWeatherList(list);
    }
  }, [weatherDetailData]);

  return (
    <div className={`${styles[weatherClass]} ${styles.cityDetail}`}>
      <div className={styles.topBarCityDetail}>
        <img alt="Indietro" src={back} onClick={()=>{navigate('/home')}}></img>
        <div className={styles.cityName}>{cityName}</div>
        <img alt="Aggiungi" src={plus}></img>
      </div>
      <div className={styles.day}>
        {date.toLocaleDateString("en", { weekday: "long" })} {date.getDate()},{" "}
        {date.toLocaleDateString("en", { month: "long" })}
      </div>
      <div className={styles.weatherDetail}>
        <div>{weatherClass}</div>
        <div className={styles.temperature}>
          <div className={styles.icon}></div>
          <div>{temperature}°</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <ul className={styles.hours}>
            {weaterList.map((hour, index) => {
              if (index === 0) {
                return (
                  <li key={index} className={styles.hourTemperature}>
                    <div>Now</div>
                    <div className={styles.point}>
                      <div></div>
                    </div>
                    <div>{temperature}°</div>
                  </li>
                );
              } else if (index < 8) {
                const dateDetail = dateLocation(
                  timeZone,
                  new Date(hour.dt * 1000).getTime()
                );
                const hours = dateDetail.getHours();
                const minutes = dateDetail.getMinutes();
                return (
                  <li key={index} className={styles.hourTemperature}>
                    <div>
                      {hours % 12 || 12}:{minutes < 10 ? "0" : ""}
                      {minutes} {hours > 12 ? "p.m." : "a.m."}
                    </div>
                    <div className={styles.point}>
                      <div></div>
                    </div>
                    <div>{parseInt(hour.main.temp)}°</div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div className={styles.daysContainer}>
            {weaterList.map((hour, index) => {
              if (hour.dt_txt.slice(11, 13) === "00") {
                const dateDetail = dateLocation(
                  timeZone,
                  new Date(hour.dt * 1000).getTime()
                );
                const dayName = dateDetail.toLocaleDateString("en", {
                  weekday: "long",
                });
                return (
                  <DayDetailCard
                    key={index}
                    temperature={parseInt(hour.main.temp)}
                    weatherClass={hour.weather[0].main}
                    dayName={dayName}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
