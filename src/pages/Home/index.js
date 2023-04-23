import { Row, Col, Container } from "react-bootstrap";
import plusSign from "../../icons/Plus.png";
import CityCard from "../../components/CityCard";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <Container>
      <div className={styles.greeting}>
        Good morning!
        <br />
        Mario
      </div>
      <div className={styles.addCity}>
        <img alt="Segno più" src={plusSign}></img> Aggiungi città
      </div>
      {/* <div className={styles.cityCards}> */}
      <Row xs={1} md={2}>
        <Col>
          <CityCard weatherClass={"rainy"} />
        </Col>
        <Col>
          <CityCard weatherClass={"sunny"} />
        </Col>
        <Col>
          <CityCard weatherClass={"cloudy"} />
        </Col>
      </Row>
      {/* </div> */}
    </Container>
  );
}
