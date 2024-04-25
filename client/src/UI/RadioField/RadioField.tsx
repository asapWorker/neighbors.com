import styles from "./RadioField.module.css";

import { FunctionComponent } from "react";


interface RadioFieldProps {
  children: React.ReactNode;
  radios: string[];
  name: string;
  form: string;
}

export const RadioField: FunctionComponent<RadioFieldProps> = ({
  children,
  radios,
  name,
  form
}) => {
  return <div
    className={styles["input-field"]}
    >
    <div className={styles["text-container"]}>
      {children}
    </div>

    <div className={styles["input-container"]}>

      {radios && (
        <div className={styles["radio-container"]}>
          {radios.map((val, num) => {
            return (
              <div className={styles.radio} key={val}>
                <input
                  className={styles["radio-input"]}
                  type="radio"
                  name={name}
                  value={num}
                  id={val}
                  form={form}
                  defaultChecked={!num}
                />
                <label htmlFor={val}>{val}</label>
              </div>
            );
          })}
        </div>
      )}
  </div>
</div>
}