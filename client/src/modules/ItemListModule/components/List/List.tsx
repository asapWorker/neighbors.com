import { FunctionComponent } from "react";
import styles from "./List.module.css";
import { useListData } from "../../hooks/useListData";
import { Item } from "../Item/Item";
import { FilterSettings } from "../../../../types/FilterSettings";
import { Spinner } from "../../../../UI/Spinner/Spinner";

interface ListProps {
  isHouse: boolean;
  filterSettings: FilterSettings;
}

export const List: FunctionComponent<ListProps> = ({
  isHouse,
  filterSettings
}) => {
  const {houseList, personList, sort} = useListData();

  if (!houseList || !personList) {
    return <div className={styles.list}>
      <Spinner/>
    </div>
  }

  return <div className={styles.list}>
    {
      (isHouse ? sort(filterSettings, houseList) : sort(filterSettings, personList))?.map((itemData) => {
        return <Item itemData={itemData} isHouse={isHouse} key={itemData.id}/>
      })
    }
  </div>;
};
