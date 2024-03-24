import { FunctionComponent } from "react";
import { FormModule } from "../../../FormModule";
import { ExtraForm } from "../ExtraForm/ExtraForm";
import { FormType } from "../../../FormModule/components/FormModule/FormModule";

interface PersonModuleProps {
  
}

export const PersonModule: FunctionComponent = () => {
  return <>
    <FormModule type={FormType.NewAnnouncement}/>
    <ExtraForm/>
  </>
}