import styles from "./EditableText.module.css";
import classnames from "classnames";

import { Children, FunctionComponent } from "react";
import { Text, TextType } from "../Text/Text";
import { useEditableTextData } from "./hooks/useEditableTextData";
import { Btn } from "../Btn/Btn";

interface EditableTextProps {
  children: React.ReactNode;
  isEditable: boolean;
  saveChanges: (value: any) => void;
  isWithRating?: boolean;
  options?: string[];
  isMultiple?: boolean;
}

export const EditableText: FunctionComponent<EditableTextProps> = ({
  children,
  isEditable,
  saveChanges,
  options = null,
  isMultiple = false,
  isWithRating = false
}) => {
  const {
    isEditing,
    value,
    curValue,
    curRating,
    edit,
    textChangeHandle,
    submitChange,
    resetChange,
    ratingChangeHandle
  } = useEditableTextData(
    Children.toArray(children)[1].toString(),
    saveChanges,
    isWithRating
  );

  if (isEditable && !isEditing) {
    return (
      <div className={classnames(styles.str)}>
        <div className={styles["text-container"]}>
          {Children.toArray(children)[0]}
          <Text type={TextType.Normal}>{value}</Text>
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
          {!options && (
            <input
              onChange={textChangeHandle.bind(this)}
              className={styles["text-input"]}
              value={curValue}
            />
          )}

          {isWithRating && (
            <input
              type="number"
              min={-1}
              max={5}
              onChange={ratingChangeHandle.bind(this)}
              className={styles["text-input"]}
              value={curRating}
            />
          )}

          {options && (
            <select
              multiple={isMultiple}
              defaultValue={isMultiple ? [options[0]] : options[0]}
              className={styles.select}
              onChange={textChangeHandle.bind(this)}
            >
              {options.map((item) => (
                <option key={item}>{item}</option>
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
