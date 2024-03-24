import styles from "./Filter.module.css";
import filterImgUrl from "../../assets/filter.svg";

import { FunctionComponent } from "react";
import { Btn } from "../../../../UI/Btn/Btn";


interface FilterProps {
  openFilter: () => void;
}

export const Filter: FunctionComponent<FilterProps> = ({
  openFilter
}) => {
  return <Btn style={styles.filter} onClickHandle={openFilter}>
    <img src={filterImgUrl} alt="filter-img" className={styles["filter-img"]}/>
  </Btn>
}