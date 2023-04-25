import styles from "./DayDetailCard.module.scss";

export default function DayDetailCard() {
  return (
    <div className={`${styles.dayDetailCard} ${styles.sunny}`}>
      <div className={styles.day}>Saturday</div>
      <div className={styles.temperature}>18°</div>
      <div className={styles.icon}></div>
    </div>
  );
}
