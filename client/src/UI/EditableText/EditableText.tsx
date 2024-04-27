import styles from "./EditableText.module.css";
import classnames from "classnames";

import { Children, FunctionComponent } from "react";
import { Text, TextType } from "../Text/Text";
import { useEditableTextData } from "./hooks/useEditableTextData";
import { Btn } from "../Btn/Btn";
import { Stars } from "../Stars/Stars";
import { BoundedItem } from "../../modules/ItemModule/types/BoundedItem";
import { Address } from "../../types/AddressType";
import { MetroType } from "../../types/MetroType";

interface EditableTextProps {
  children: React.ReactNode;
  isEditable: boolean;
  saveChanges: (value: any) => boolean | null;
  isWithRating?: boolean;
  options?: BoundedItem[] | string[] | Address[] |MetroType[];
  isMultiple?: boolean;
  isNumber?: boolean;
  areMark?: boolean;
}

export const EditableText: FunctionComponent<EditableTextProps> = ({
  children,
  isEditable,
  saveChanges,
  options = null,
  isMultiple = false,
  isWithRating = false,
  isNumber = false,
  areMark = false,
}) => {
  const {
    isEditing,
    value,
    rating,
    curValue,
    curRating,
    edit,
    textChangeHandle,
    submitChange,
    resetChange,
    ratingChangeHandle,
  } = useEditableTextData(
    Children.toArray(children)[1].toString(),
    saveChanges,
    isWithRating,
    areMark,
    options
  );

  if (isEditable && !isEditing) {
    return (
      <div className={classnames(styles.str)}>
        <div className={styles["text-container"]}>
          {Children.toArray(children)[0]}
          {!areMark && (
            <Text type={TextType.Normal}>
              {value}
            </Text>
          )}
          {areMark && <Stars mark={rating} />}
        </div>

        <Btn onClickHandle={edit} style={styles.btn}>
          изменить
        </Btn>
      </div>
    );
  } else if (isEditable && isEditing) {
    return (
      <div
        className={classnames(styles.str, styles["input-str"], styles.multiple)}
      >
        <div className={styles["text-container"]}>
          {Children.toArray(children)[0]}
        </div>

        <div className={styles["input-container"]}>
          {!options && typeof curValue === "string" && (
            <input
              onChange={textChangeHandle.bind(this)}
              className={styles["text-input"]}
              value={curValue}
              type={isNumber ? "number" : "text"}
            />
          )}

          {isWithRating && (
            <input
              onChange={ratingChangeHandle.bind(this)}
              className={styles["text-input"]}
              value={curRating}
              type="number"
            />
          )}

          {options && (
            <select
              multiple={isMultiple}
              className={styles.select}
              onChange={textChangeHandle.bind(this)}
            >
              {options.map((item: BoundedItem | string | Address | MetroType, num: number) => (
                <option
                  value={num}
                  key={typeof item === "string" ? item : item.id}
                >
                  {typeof item === "string" ? item : item.name}
                </option>
              ))}
            </select>
          )}

          <div className={styles["btn-container"]}>
            <Btn onClickHandle={submitChange.bind(this)} style={styles.btn}>
              сохранить
            </Btn>
            <Btn onClickHandle={resetChange.bind(this)} style={styles.btn}>
              отменить
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.str}>
      <div className={styles["text-container"]}>
        {Children.toArray(children)[0]}
        <Text type={TextType.Normal}>{value}</Text>
      </div>
    </div>
  );
};
