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
import { UserData } from "../../../../hooks/useUserData";
import {
  ExtendedHouseItem,
  ExtendedPersonItem,
  PersonalHouseItem,
  PersonalPersonItem,
} from "../../../../types/ItemTypes";
import { Spinner } from "../../../../UI/Spinner/Spinner";

type ItemProps = {
  type: string;
  user: UserData;
  baseData:
    | ExtendedHouseItem
    | ExtendedPersonItem
    | PersonalHouseItem
    | PersonalPersonItem;
  isPersonal?: boolean;
  reportDeletion?: () => void;
}

export const Item: FunctionComponent<ItemProps> = ({
  user,
  baseData,
  type,
  isPersonal = false,
  reportDeletion = () => {}
}) => {
  const {
    isHouse,
    isEditable,
    isClient,
    itemData,
    setNewData,
    chooseHandle,
    deleteHandle,
    boundedItemsList,
    isHouseBtnIsVisible,
    isPersonBtnIsVisible,
  } = useItemData(user, type, baseData, isPersonal, reportDeletion);

  if (!itemData) {
    return <div className={styles.item}>
      <Spinner/>
    </div>
  }

  return (
    <div className={styles.item}>
      {("mark" in itemData) && (
        <div className={styles["stars-container"]}>
          <Stars mark={itemData.mark} style={styles.stars} />
        </div>
      )}

      {!isHouse && (
        <>
          {("name" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "name")}
          >
            <Text type={TextType.Bold}>Имя:</Text>
            {itemData.name}
          </EditableText>}

          {("age" in itemData) && <EditableText
            isNumber={true}
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "age")}
          >
            <Text type={TextType.Bold}>Возраст:</Text>
            {itemData.age}
          </EditableText>}

          <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "sex")}
            options={personSexes}
          >
            <Text type={TextType.Bold}>Пол:</Text>
            {itemData.sex}
          </EditableText>

          <EditableText
            isNumber={true}
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "money")}
          >
            <Text type={TextType.Bold}>Бюджет:</Text>
            {itemData.money}
          </EditableText>

          {("attitudeTowardSmoking" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "attitude-toward-smoking")}
            options={attitudesTowardSmoking}
          >
            <Text type={TextType.Bold}>Отношение к курению:</Text>
            {itemData.attitudeTowardSmoking || ""}
          </EditableText>}

          {("animals" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "animals")}
            options={YesNoAnswers}
          >
            <Text type={TextType.Bold}>Есть животные:</Text>
            {itemData.animals}
          </EditableText>}

          {("boundedItems" in itemData) && (
            <EditableText
              isEditable={isEditable}
              saveChanges={setNewData.bind(this, "bounded-items")}
              isWithRating={true}
              options={boundedItemsList}
            >
              <Text type={TextType.Bold}>Прошлые соседи:</Text>
              {!itemData.boundedItems?.length
                ? YesNo.No
                : itemData.boundedItems.join(", ")}
            </EditableText>
          )}
        </>
      )}

      {isHouse && (
        <>
          {("address" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "address")}
          >
            <Text type={TextType.Bold}>Адрес:</Text>
            {itemData.address}
          </EditableText>}

          {("metro" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "metro")}
            options={Metros}
          >
            <Text type={TextType.Bold}>Метро:</Text>
            {itemData.metro}
          </EditableText>}

          <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "sex")}
            options={sexes}
          >
            <Text type={TextType.Bold}>Пол:</Text>
            {itemData.sex}
          </EditableText>

          <EditableText
            isNumber={true}
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "money")}
          >
            <Text type={TextType.Bold}>Плата за месяц:</Text>
            {itemData.money}
          </EditableText>

          {("type" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "type")}
            options={houseTypes}
          >
            <Text type={TextType.Bold}>Тип:</Text>
            {itemData.type}
          </EditableText>}

          {("smoking" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "smoking")}
            options={YesNoAnswers}
          >
            <Text type={TextType.Bold}>Разрешено курение:</Text>
            {itemData.smoking}
          </EditableText>}

          {("animals" in itemData) && <EditableText
            isEditable={isEditable}
            saveChanges={setNewData.bind(this, "animals")}
            options={YesNoAnswers}
          >
            <Text type={TextType.Bold}>Разрешены животные:</Text>
            {itemData.animals}
          </EditableText>}

          {("boundedItems" in itemData) && (
            <EditableText
              isEditable={isEditable}
              saveChanges={setNewData.bind(this, "bounded-items")}
              isWithRating={true}
              options={boundedItemsList}
            >
              <Text type={TextType.Bold}>Прошлые жильцы:</Text>
              {!itemData.boundedItems?.length
                ? YesNo.No
                : itemData.boundedItems.join(", ")}
            </EditableText>
          )}
        </>
      )}

      <div className={styles["btn-container"]}>
        {(isHouseBtnIsVisible || isPersonBtnIsVisible) &&
          isClient &&
          !isEditable && <Btn onClickHandle={chooseHandle}>Выбрать</Btn>}
        {isEditable && <Btn onClickHandle={deleteHandle}>Удалить</Btn>}
      </div>
    </div>
  );
};
