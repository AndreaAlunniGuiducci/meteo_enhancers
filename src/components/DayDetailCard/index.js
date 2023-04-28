import styles from "./DayDetailCard.module.scss";

export default function DayDetailCard({ temperature, weatherClass, dayName }) {
  temperature = temperature ?? "--";
  weatherClass = weatherClass ?? "";
  dayName = dayName ?? "--";
  return (
    <div className={`${styles.dayDetailCard} ${styles[weatherClass]}`}>
      <div className={styles.day}>{dayName}</div>
      <div className={styles.temperature}>{temperature}°</div>
      <div className={styles.icon}></div>
    </div>
  );
}
