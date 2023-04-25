import DayDetailCard from "../../components/DayDetailCard";
import back from "../../icons/Arrow-Left.png";
import plus from "../../icons/White-Plus.png";
import styles from "./CityDetail.module.scss";

export default function CityDetail() {
  return (
    <div className={`${styles.Clear} ${styles.cityDetail}`}>
      <div className={styles.topBarCityDetail}>
        <img alt="Indietro" src={back}></img>
        <div className={styles.cityName}>Torino</div>
        <img alt="Aggiungi" src={plus}></img>
      </div>
      <div className={styles.day}>Friday 18, september</div>
      <div className={styles.weatherDetail}>
        <div>Sunny</div>
        <div className={styles.temperature}>
          <div className={styles.icon}></div>
          <div>22°</div>
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
