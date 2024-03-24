import { FunctionComponent } from "react";
import { Switch } from "../Switch/Switch";
import styles from "./ListControlModule.module.css";
import { FilterSettings } from "../../../../types/FilterSettings";
import { Filter } from "../Filter/Filter";

interface ListControlModuleProps {
  isHouse: boolean;
  changeList: (isHouse: boolean) => void;
  openFilter: () => void;
}

export const ListControlModule: FunctionComponent<ListControlModuleProps> = ({
  isHouse,
  changeList,
  openFilter
}) => {
  return <div className={styles["list-control-module"]}>
    <Switch isHouse={isHouse} changeList={changeList}/>
    <Filter openFilter={openFilter}/>
  </div>
}