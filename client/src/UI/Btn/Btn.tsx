import classnames from "classnames";
import styles from "./Btn.module.css";
import React, { FunctionComponent } from "react";

interface BtnProps {
  children: React.ReactNode;
  style?: string;
  isSubmit?: boolean;
  onClickHandle?: () => void;
}

export const Btn: FunctionComponent<BtnProps> = ({
  onClickHandle = () => {},
  children,
  style = "",
  isSubmit = false,
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={style === "" ? styles.btn : style}
      onClick={onClickHandle}
    >
      {children}
    </button>
  );
};
