import { FunctionComponent } from "react";
import { Item } from "../../../ItemModule";
import { User } from "../../../../constants/constants";
import { usePersonModuleData } from "../../hooks/usePersonModuleData";
import { Btn } from "../../../../UI/Btn/Btn";
import { FormModule, FormType } from "../../../FormModule/components/FormModule/FormModule";

export const PersonModule: FunctionComponent = () => {
  const { user, baseData, isForm, deleteItem, openForm, closeForm } = usePersonModuleData();

  if (user.type === User.Admin) {
    return <>
      <Btn onClickHandle={openForm}>Добавить объявление</Btn>
    </>
  }

  return (
    <>
      {baseData && (
        <Item
          user={user}
          type={user.type}
          baseData={baseData}
          isPersonal={true}
          reportDeletion={deleteItem}
        />
      )}

      {isForm && <FormModule type={FormType.NewAnnouncement}/>}

      {!isForm && !baseData && <Btn onClickHandle={openForm}>Добавить объявление</Btn>}
    </>
  );
};
