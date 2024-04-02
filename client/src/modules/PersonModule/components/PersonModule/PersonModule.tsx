import styles from "./PersonModule.module.css";

import { FunctionComponent } from "react";
import { Item } from "../../../ItemModule";
import { User } from "../../../../constants/constants";
import { usePersonModuleData } from "../../hooks/usePersonModuleData";
import { Btn } from "../../../../UI/Btn/Btn";
import {
  FormModule,
  FormType,
} from "../../../FormModule/components/FormModule/FormModule";
import { Marks } from "../Marks/Marks";

export const PersonModule: FunctionComponent = () => {
  const { user, baseData, isForm, deleteItem, openForm, closeForm } =
    usePersonModuleData();

  return (
    <div className={styles.personal}>
      {user.type === User.Client && <Marks id={user.id} />}

      {baseData && user.type !== User.Admin && (
        <div className={styles.title}>Ваше объявление:</div>
      )}

      {baseData && user.type !== User.Admin && (
        <Item
          user={user}
          type={baseData.announcement}
          baseData={baseData}
          isPersonal={true}
          reportDeletion={deleteItem}
        />
      )}

      {isForm && (
        <FormModule
          type={FormType.NewAnnouncement}
          reportAboutSubmit={closeForm}
        />
      )}

      {((!isForm && !baseData) || (user.type === User.Admin && !isForm)) && (
        <Btn onClickHandle={openForm}>Добавить объявление</Btn>
      )}
    </div>
  );
};
