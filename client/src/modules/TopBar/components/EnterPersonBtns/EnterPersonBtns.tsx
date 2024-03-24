import styles from "./EnterPersonBtn.module.css";
import personIconUrl from "../../assets/person.svg";
import { Btn } from "../../../../UI/Btn/Btn"
import { FunctionComponent } from "react";
import { useEnterPensonBtnsData } from "../../hooks/useEnterPersonBtnsData";

export const EnterPersonBtns: FunctionComponent = () => {
  const {text, handleEnterClick, handlePersonClick} = useEnterPensonBtnsData();

  return <div className={styles.container}>
    <Btn onClickHandle={handleEnterClick}>
      {text}
    </Btn>

    <Btn onClickHandle={handlePersonClick} style={styles.person}>
      <img src={personIconUrl} alt="person-icon" className={styles["person-icon"]}/>
    </Btn>
  </div>
}