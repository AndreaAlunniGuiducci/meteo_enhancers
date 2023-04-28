import { Spinner } from "react-bootstrap";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
        <Spinner style={{width: '25vw', height: '25vw'}} animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  );
}
