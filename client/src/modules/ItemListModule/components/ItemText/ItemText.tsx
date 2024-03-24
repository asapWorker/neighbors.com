import styles from "./ItemText.module.css";

import { FunctionComponent } from "react";

import { Text, TextType } from "../../../../UI/Text/Text";

import { PersonItem } from "../../types/personType";
import { HouseItem } from "../../types/houseType";


interface ItemTextProps {
  itemData: PersonItem | HouseItem
}

export const ItemText: FunctionComponent<ItemTextProps> = ({
  itemData
}) => {
  if ("name" in itemData) {
    return <div className={styles["item-text"]}>
      <div className={styles.str}>
        <Text type={TextType.Bold}>
          {itemData.name}
        </Text>
      </div>

      <div className={styles.str}>
        <Text type={TextType.Bold}>Пол: </Text>
        <Text type={TextType.Normal}>{itemData.sex}</Text>
      </div>

      <div className={styles.str}>
        <Text type={TextType.Bold}>Возраст: </Text>
        <Text type={TextType.Normal}>{itemData.age}</Text>
      </div>

      <div className={styles.str}>
        <Text type={TextType.Bold}>Бюджет: </Text>
        <Text type={TextType.Normal}>{itemData.money}</Text>
      </div>
    </div>
  } else {
    return <div className={styles["item-text"]}>
      <div className={styles.str}>
        <Text type={TextType.Bold}>
          {itemData.address}
        </Text>
      </div>

      <div className={styles.str}>
        <Text type={TextType.Bold}>Метро: </Text>
        <Text type={TextType.Normal}>{itemData.metro.join(', ')}</Text>
      </div>

      <div className={styles.str}>
        <Text type={TextType.Bold}>Пол: </Text>
        <Text type={TextType.Normal}>{itemData.sex}</Text>
      </div>

      <div className={styles.str}>
        <Text type={TextType.Bold}>Плата: </Text>
        <Text type={TextType.Normal}>{itemData.money}</Text>
      </div>
    </div>
  }
}