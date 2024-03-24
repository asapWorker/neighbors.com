import { FunctionComponent } from "react";
import styles from "./Stars.module.css";
import starsImgUrl from "./stars.svg";

interface StarsProps {
  mark: number;
  style?: string;
}

export const Stars: FunctionComponent<StarsProps> = ({
  mark,
  style = ""
}) => {
  return <div className={(style === "") ? styles.stars : style}>
    <div className={styles["stars-bg"]} style={{width: (mark / 5 * 100).toFixed(0) + "%"}}/>
    <img src={starsImgUrl} alt="stars-img" className={styles["stars-img"]}/>
  </div>
}