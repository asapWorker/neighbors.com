import { useTextFieldData } from "./hooks/useTextFieldData";
import styles from "./TextField.module.css";

import { FunctionComponent } from "react";

const enum Message {
  No = "",
  Empty = "поле не заполнено",
  Password = "минимальная длина - 8 символов",
}

export const enum TextFieldType {
  Text = "text",
  Password = "password",
  Number = "number"
}

interface TextFieldProps {
  children: React.ReactNode;
  type?: TextFieldType; 
  isMessage: boolean;
  name: string;
}

export const TextField: FunctionComponent<TextFieldProps> = ({
  children,
  name,
  isMessage,
  type = TextFieldType.Text
}) => {
  const { value, changeHandle } = useTextFieldData();

  return (
    <div className={styles["text-field"]}>
      {children}

      <input
        form="form"
        className={styles.input}
        type={type}
        onChange={changeHandle.bind(this)}
        value={value}
        name={name}
        min={0}
        max={100000000}
      />

      <div className={styles.message}>
        {(!isMessage || value.length >= 8 || ((type !== TextFieldType.Password) && value !== ""))
          ? Message.No
          : (value === "")
          ? Message.Empty
          : Message.Password
        }
      </div>
    </div>
  );
};
