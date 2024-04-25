import styles from "./SelectField.module.css";

import { FunctionComponent } from "react";
import { Address } from "../../types/AddressType";
import { MetroType } from "../../types/MetroType";

interface SelectFieldProps {
  options: Address[] | MetroType[];
  name: string;
  children: React.ReactElement;
  form: string;
}

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  options,
  children,
  name,
  form
}) => {
  return (
    <div className={styles["input-field"]}>
      <div className={styles["text-container"]}>{children}</div>

      <select id={name} name={name} className={styles.select} form={form}>
        {options.map((item: Address | MetroType, num: number) => (
          <option value={num} key={typeof item === "string" ? item : item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
