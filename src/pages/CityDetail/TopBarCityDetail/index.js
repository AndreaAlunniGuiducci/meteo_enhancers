import back from '../../../icons/Arrow-Left.png'
import plus from '../../../icons/Plus.png'
import styles from './TopBarCityDetail.module.scss'

export default function TopBarCityDetail() {
  return (
    <div className={styles.topBarCityDetail}>
      <img alt="Indietro" src={back}></img>
      <div>Torino</div>
      <img alt="Aggiungi" src={plus}></img>
    </div>
  );
}
