import styles from "./Item.module.css";

import { FunctionComponent } from "react";

import { Btn } from "../../../../UI/Btn/Btn";
import { Stars } from "../../../../UI/Stars/Stars";
import { useItemData } from "../../hooks/useItemData";
import { ItemText } from "../ItemText/ItemText";

import { PersonItem } from "../../types/personType";
import { HouseItem } from "../../types/houseType";


interface ItemProps {
  itemData: PersonItem | HouseItem;
  isHouse: boolean;
}

export const Item: FunctionComponent<ItemProps> = ({
  itemData,
  isHouse
}) => {
  const {handleItemClick} = useItemData();

  return <Btn onClickHandle={handleItemClick.bind(this, itemData, isHouse)} style={styles.item}>
    <Stars mark={itemData.mark} style={styles.stars}/>
    <ItemText itemData={itemData}/>
  </Btn>
}