import { FunctionComponent } from "react";
import { Item } from "../../../ItemModule";
import { User } from "../../../../constants/constants";
import { usePersonModuleData } from "../../hooks/usePersonModuleData";
import { Btn } from "../../../../UI/Btn/Btn";
import { FormModule, FormType } from "../../../FormModule/components/FormModule/FormModule";

export const PersonModule: FunctionComponent = () => {
  const { user, baseData, isForm, deleteItem, openForm, closeForm } = usePersonModuleData();

  return (
    <>
      {baseData && (user.type !== User.Admin) && (
        <Item
          user={user}
          type={user.type}
          baseData={baseData}
          isPersonal={true}
          reportDeletion={deleteItem}
        />
      )}

      {isForm && <FormModule type={FormType.NewAnnouncement} reportAboutSubmit={closeForm}/>}

      {(!isForm && !baseData || ((user.type === User.Admin) && !isForm)) && <Btn onClickHandle={openForm}>Добавить объявление</Btn>}
    </>
  );
};
