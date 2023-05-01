import { useLocationDate } from "../../customHooks/useLocatonDate";
import styles from "./HoursDetail.module.scss";
export default function HoursDetail({ weaterList, temperature, timeZone }) {
  const [dateLocation] = useLocationDate();
  timeZone = timeZone ?? 0;
  temperature = temperature ?? "--";
  weaterList = weaterList ?? [];

  return (
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
  );
}
