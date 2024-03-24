import { FunctionComponent } from "react";
import styles from "./Item.module.css";
import { Text, TextType } from "../../../../UI/Text/Text";
import { EditableText } from "../../../../UI/EditableText/EditableText";
import { useItemData } from "../../hooks/useItemData";
import { Stars } from "../../../../UI/Stars/Stars";
import {
  Metros,
  YesNo,
  YesNoAnswers,
  attitudesTowardSmoking,
  houseTypes,
  personSexes,
  sexes,
} from "../../../../constants/constants";
import { Btn } from "../../../../UI/Btn/Btn";

interface ItemProps {
  type: string;
  user: string;
  baseData: Object;
}

export const Item: FunctionComponent<ItemProps> = ({
  user,
  baseData,
  type
}) => {
  const {
    isHouse,
    isEditable,
    isClient,
    itemData,
    setNewData,
    chooseHandle,
    deleteHandle,
    boundedItemsList
  } = useItemData(user, type, baseData);

  if (!itemData) {
    return null;
  }

  return (
    <div className={styles.item}>
      <div className={styles["stars-container"]}>
        <Stars mark={itemData.mark} style={styles.stars} />
      </div>

      {!isHouse && <>
        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "name")}
        >
          <Text type={TextType.Bold}>Имя:</Text>
          {itemData.name}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "age")}
        >
          <Text type={TextType.Bold}>Возраст:</Text>
          {itemData.age}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "sex")}
          options={personSexes}
        >
          <Text type={TextType.Bold}>Пол:</Text>
          {itemData.sex}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "money")}
        >
          <Text type={TextType.Bold}>Бюджет:</Text>
          {itemData.money}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "attitude-toward-smoking")}
          options={attitudesTowardSmoking}
        >
          <Text type={TextType.Bold}>Отношение к курению:</Text>
          {itemData.attitudeTowardSmoking}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "bounded-items")}
          isWithRating={true}
          options={boundedItemsList}
        >
          <Text type={TextType.Bold}>Прошлые соседи:</Text>
          {!itemData.boundedItems?.length ? YesNo.No : itemData.boundedItems.join(', ')}
        </EditableText>
      </>}

      {isHouse && <>
        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "address")}
        >
          <Text type={TextType.Bold}>Адрес:</Text>
          {itemData.address}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "metro")}
          options={Metros}
          isMultiple={true}
        >
          <Text type={TextType.Bold}>Метро:</Text>
          {itemData.metro}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "sex")}
          options={sexes}
        >
          <Text type={TextType.Bold}>Пол:</Text>
          {itemData.sex}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "money")}
        >
          <Text type={TextType.Bold}>Плата:</Text>
          {itemData.money}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "type")}
          options={houseTypes}
        >
          <Text type={TextType.Bold}>Тип:</Text>
          {itemData.type}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "smoking")}
          options={YesNoAnswers}
        >
          <Text type={TextType.Bold}>Разрешено курение:</Text>
          {itemData.smoking}
        </EditableText>

        <EditableText
          isEditable={isEditable}
          saveChanges={setNewData.bind(this, "bounded-items")}
          isWithRating={true}
          options={boundedItemsList}
        >
          <Text type={TextType.Bold}>Прошлые жильцы:</Text>
          {!itemData.boundedItems?.length ? YesNo.No : itemData.boundedItems.join(', ')}
        </EditableText>
      </>}

      <div className={styles["btn-container"]}>
        {isClient && !isEditable && <Btn onClickHandle={chooseHandle}>Выбрать</Btn>}
        {isEditable && <Btn onClickHandle={deleteHandle}>Удалить</Btn>}
      </div>
    </div>
  )
};