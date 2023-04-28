import { Container } from "react-bootstrap";
import styles from './DesktopHome.module.scss'

export default function DesktopHome() {
  return <Container>
    <div className={styles.topPart}></div>
    <div className={styles.bottomPart}></div>
  </Container>;
}
