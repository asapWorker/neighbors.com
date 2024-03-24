import { FunctionComponent } from "react";
import styles from "./TopBar.module.css";
import { MainBtn } from "../MainBtn/MainBtn";
import { EnterPersonBtns } from "../EnterPersonBtns/EnterPersonBtns";

export const TopBar: FunctionComponent = () => {
  return <header className={styles.header}>
    <MainBtn/>
    <EnterPersonBtns/>
  </header>
}