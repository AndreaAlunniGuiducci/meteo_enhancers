import homeIcon from "../../icons/Home.png";
import searchIcon from "../../icons/Search.png";
import locationIcon from "../../icons/Location.png";
import styles from "./BottomBar.module.scss";

export default function BottomBar() {
  return (
    <div className={styles.bottomBar}>
      <img alt="Home" src={homeIcon}></img>
      <img alt="Ricerca" src={searchIcon}></img>
      <img alt="Mappa" src={locationIcon}></img>
    </div>
  );
}
