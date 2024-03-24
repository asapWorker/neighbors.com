import { Btn } from "../../../../UI/Btn/Btn";
import { useMainBtnData } from "../../hooks/useMainBtnData";
import styles from "./MainBtn.module.css";

export const MainBtn = () => {
  const {handleMainClick} = useMainBtnData();

  return (
    <Btn style={styles["main-btn"]} onClickHandle={handleMainClick}>
      Neighbors.com
    </Btn>
  );
};
