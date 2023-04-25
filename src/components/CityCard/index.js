import { Card } from "react-bootstrap";
import styles from "./CityCard.module.scss";

export default function CityCard({ weatherClass, cityName, temperature }) {
  weatherClass = weatherClass ?? "";
  cityName = cityName ?? "--";
  temperature = parseInt(temperature) ?? "--";
  return (
    <Card className={`${styles.customCard} ${styles[weatherClass]}`}>
      <Card.Body>
        <div className={styles.cardInfo}>
          <div>
            <div className={styles.cityName}>{cityName}</div>
            <div className={styles.day}>Friday 18, september</div>
            <div className={styles.time}>2:38pm</div>
          </div>
          <div className={styles.icon}></div>
          <div className={styles.temperature}>{temperature}°</div>
        </div>
      </Card.Body>
    </Card>
  );
}
