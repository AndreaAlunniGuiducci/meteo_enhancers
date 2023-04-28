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
  const [cityName, setCityName] = useState("--");
  const [temperature, setTemperature] = useState("--");
  const [weatherClass, setWeatherClass] = useState("");
  const [date, setDate] = useState(new Date());
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
      console.log(e);
      navigate("/home");
    }
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(weatherDetailData).length > 0) {
      const city = weatherDetailData.city;
      const list = weatherDetailData.list;
      const timeZone = city.timezone * 1000;
      setDate(dateLocation(timeZone));
      setCityName(city.name);
      setTemperature(parseInt(list[0].main.temp));
      setWeatherClass(list[0].weather[0].main)
      debugger;
    }
  }, [weatherDetailData]);
  return (
    <div className={`${styles[weatherClass]} ${styles.cityDetail}`}>
      <div className={styles.topBarCityDetail}>
        <img alt="Indietro" src={back}></img>
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
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
            <li className={styles.hourTemperature}>
              <div>Now</div>
              <div className={styles.point}>
                <div></div>
              </div>
              <div>22°</div>
            </li>
          </ul>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div className={styles.daysContainer}>
            <DayDetailCard />
            <DayDetailCard />
            <DayDetailCard />
            <DayDetailCard />
            <DayDetailCard />
            <DayDetailCard />
            <DayDetailCard />
          </div>
        </div>
      </div>
    </div>
  );
}
