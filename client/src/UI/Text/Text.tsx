import classnames from "classnames";
import styles from "./Text.module.css";

import React, { FunctionComponent, ReactNode } from "react";


export const enum TextType {
  Normal = "normal",
  Bold = "bold",
}

interface TextProps {
  type: TextType;
  children: ReactNode;
}

export const Text: FunctionComponent<TextProps> = ({
  type,
  children
}) => {
  return <div className={classnames(styles.text, styles[type])}>
    {children}
  </div>
}