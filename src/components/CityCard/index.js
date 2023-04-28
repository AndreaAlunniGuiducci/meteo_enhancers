import { Card } from "react-bootstrap";
import styles from "./CityCard.module.scss";
import { Link } from "react-router-dom";

export default function CityCard({
  weatherClass,
  cityName,
  temperature,
  cityDate,
  coord,
}) {
console.log(cityDate)
  weatherClass = weatherClass ?? "";
  cityName = cityName ?? "--";
  temperature = parseInt(temperature) ?? "--";
  coord = JSON.stringify(coord) ?? JSON.stringify({});
  console.log(cityDate)
  const today = cityDate;
  const dayName = today.toLocaleDateString("en", { weekday: "long" });
  const dayNumber = today.getDate();
  const month = today.toLocaleDateString("en", { month: "long" });
  const hours = today.getHours();
  const minutes = today.getMinutes();

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/detail/${btoa(coord)}`}
    >
      <Card
        className={`${styles.customCard} ${styles[weatherClass]}`}
      >
        <Card.Body>
          <div className={styles.cardInfo}>
            <div>
              <div className={styles.cityName}>{cityName}</div>
              <div className={styles.day}>
                {dayName} {dayNumber}, {month}
              </div>
              <div className={styles.time}>
                {hours % 12 || 12}:{minutes < 10 ? "0" : ""}
                {minutes} {hours > 12 ? "p.m." : "a.m."}
              </div>
            </div>
            <div className={styles.icon}></div>
            <div className={styles.temperature}>{temperature}°</div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
