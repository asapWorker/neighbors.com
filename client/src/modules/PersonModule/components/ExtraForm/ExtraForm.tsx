import { useExtraFormData } from "../../hooks/useExtraFormData"
import { Btn } from "../../../../UI/Btn/Btn";
import { FormModule } from "../../../FormModule";
import { FunctionComponent } from "react";

export const ExtraForm: FunctionComponent = () => {
  const {isEmpty, isActive, openForm, submitNewItem} = useExtraFormData();

  if (isEmpty) {
    return null;
  } else if (!isActive) {
    return <Btn onClickHandle={openForm}>
      Добавить объявление
    </Btn>
  } else {
    return <FormModule isEnter={false}/>
  }
}