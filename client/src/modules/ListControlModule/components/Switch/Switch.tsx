import styles from "./Switch.module.css";

import { FunctionComponent, useState } from "react";
import { Btn } from "../../../../UI/Btn/Btn";
import classNames from "classnames";

interface SwitchProps {
  isHouse: boolean;
  changeList: (isHouse: boolean) => void;
}

export const Switch: FunctionComponent<SwitchProps> = ({ isHouse, changeList }) => {

  return (
    <div className={styles.switch}>
      <Btn
        style={classNames(styles.btn, isHouse && styles.active)}
        onClickHandle={changeList.bind(this, true)}
      >
        Жилье
      </Btn>

      <Btn
        style={classNames(styles.btn, !isHouse && styles.active)}
        onClickHandle={changeList.bind(this, false)}
      >
        Сосед
      </Btn>
    </div>
  );
};
