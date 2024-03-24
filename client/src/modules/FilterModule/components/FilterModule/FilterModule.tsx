import styles from "./FilterModule.module.css";

import { FunctionComponent } from "react";
import { FilterSettings } from "../../../../types/FilterSettings";
import { Btn } from "../../../../UI/Btn/Btn";
import { useFilterModuleData } from "../../hooks/useFilterModuleData";
import { Metros } from "../../../../constants/constants";


interface FilterModuleProps {
  isHouse: boolean;
  setFilterSettings: (settings: FilterSettings) => void;
}

export const FilterModule: FunctionComponent<FilterModuleProps> = ({
  isHouse,
  setFilterSettings,
}) => {
  const { formRef, handleSave } = useFilterModuleData(
    isHouse,
    setFilterSettings
  );

  return (
    <form
      className={styles["filter-module"]}
      onSubmit={handleSave}
      ref={formRef}
    >
      <h3 className={styles.title}>Фильтрация</h3>

      <fieldset>
        <legend className={styles.bold}>Пол:</legend>

        <div className={styles["str"]}>
          <input
            type="radio"
            name="sex"
            id="any"
            value="any"
            defaultChecked={true}
            className={styles.radio}
          />
          <label htmlFor="any">любой</label>
        </div>

        <div className={styles["str"]}>
          <input
            type="radio"
            name="sex"
            id="male"
            value="male"
            className={styles.radio}
          />
          <label htmlFor="male">муж</label>
        </div>

        <div className={styles["str"]}>
          <input
            type="radio"
            name="sex"
            id="female"
            value="female"
            className={styles.radio}
          />
          <label htmlFor="female">жен</label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={styles.bold}>Сортировать бюджет по:</legend>

        <div className={styles["str"]}>
          <input
            type="radio"
            name="money"
            id="ascending"
            value="ascending"
            defaultChecked={true}
            className={styles.radio}
          />
          <label htmlFor="aschending">по возрастанию</label>
        </div>

        <div className={styles["str"]}>
          <input
            type="radio"
            name="money"
            id="descending"
            value="descending"
            className={styles.radio}
          />
          <label htmlFor="descending">по убыванию</label>
        </div>
      </fieldset>

      {isHouse && (
        <label className={styles.bold}>
          Метро:
          <div className={styles["metro-list"]}>
            {Metros.map((item) => {
              return <div className={styles["str"]}>
                <input
                  type="checkbox"
                  name="metro"
                  value={item}
                  defaultChecked={false}
                  id={item}
                  className={styles.checkbox}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            })}
          </div>
        </label>
      )}

      <div className={styles["btn-save-container"]}>
        <Btn isSubmit={true}>Применить</Btn>
      </div>
    </form>
  );
};