import { Card } from "react-bootstrap";
import styles from "./CityCard.module.scss";

export default function CityCard({weatherClass}) {
  return (
    <Card className={styles.customCard}>
      <Card.Body className={styles[weatherClass]}>
        <div className={styles.cardInfo}>
          <div>
            <div className={styles.cityName}>London</div>
            <div className={styles.day}>Friday 18, september</div>
            <div className={styles.time}>2:38pm</div>
          </div>
          <div className={styles.icon}></div>
          <div className={styles.temperature}>18°</div>
        </div>
      </Card.Body>
    </Card>
  );
}
