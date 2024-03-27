import styles from "./EnterPersonBtn.module.css";
import personIconUrl from "../../assets/person.svg";
import { Btn } from "../../../../UI/Btn/Btn";
import { FunctionComponent } from "react";
import { useEnterPensonBtnsData } from "../../hooks/useEnterPersonBtnsData";
import { useUser } from "../../../../contexts/useUserContext";

enum Title {
  admin = "Ваш кабинет администратора",
  client = "Ваш личный кабинет клиента",
  guest = "Войдите, чтобы получить доступ к личному кабинету",
}

export const EnterPersonBtns: FunctionComponent = () => {
  const { text, handleEnterClick, handlePersonClick } =
    useEnterPensonBtnsData();
  const user = useUser();

  return (
    <div className={styles.container}>
      <Btn onClickHandle={handleEnterClick}>{text}</Btn>

      <Btn onClickHandle={handlePersonClick} style={styles.person}>
        <img
          src={personIconUrl}
          alt="person-icon"
          className={styles["person-icon"]}
          title={Title[user.type]}
        />
      </Btn>
    </div>
  );
};
