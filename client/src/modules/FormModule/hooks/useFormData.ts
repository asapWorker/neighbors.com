import { useCallback, useEffect, useRef, useState } from "react";
import { useChangeUser, useUser } from "../../../contexts/useUserContext";
import { useNavigate } from "react-router-dom";
import { enter } from "../api/enter";
import { registrate } from "../api/registrate";
import { Address } from "../../../types/AddressType";
import { getAddresses } from "../../../api/getAddresses";
import { MetroType } from "../../../types/MetroType";
import { getMetros } from "../../../api/getMetros";
import { addNewItem } from "../api/addNewItem";


function preprocessData(data: FormData, addresses: Address[], metros: MetroType[]) {
  let isFilled = true;

  data.forEach((val, name) => {
    if (val === "") {
      isFilled = false;
    } else if ((name === "password") && (val.toString().length < 8)) {
      isFilled = false;
      return;
    }
  })

  if (!isFilled) {
    return isFilled;
  }

  data.forEach((val, name) => {
    if (name === "address") {
      data.set(name, addresses[Number(val)].id);
    } else if (name === "metro") {
      data.set(name, metros[Number(val)].id);
    } else if (["sex", "type", "smoking", "animals"].includes(name)) {
      data.set(name, String(Number(val) + 1));
    }
  })

  return isFilled;
}


export const useFormData = (isPersonal: boolean, reportAboutSubmit: () => void) => {
  const navige = useNavigate();
  const user = useUser();

  const formRef = useRef<HTMLFormElement>(null);
  const {changeUser} = useChangeUser();
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [isHouse, setIsHouse] = useState<boolean>(false);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [metros, setMetros] = useState<MetroType[]>([]);

  useEffect(() => {
    getAddresses().then((list) => {
      setAddresses(list);
    }).catch(() => {
      setAddresses([]);
    })

    getMetros().then((list) => {
      setMetros(list);
    }).catch(() => {
      setMetros([]);
    })
  }, [])

  const goToRegistration = useCallback(() => {
    navige("../registrate");
  }, [])

  /* !!!!! */
  const submitChanges = useCallback((event: any) => {
    const data = new FormData(formRef.current);

    const isFilled = preprocessData(data, addresses, metros);

    if (isFilled) {
      enter(data).then((res) => {
        if (!res) {
          setIsFilled(false);
        } else {
          changeUser(res.type, res.id, res.isLookingForHouse, res.isLookingForPerson);
          navige("..");
        }
      }).catch(() => {
        setIsFilled(false);
      })
    } else {
      setIsFilled(false);
    }

    event.preventDefault();
  }, [])

  const signUp = useCallback((event: any) => {
    const data = new FormData(formRef.current);

    const isFilled = preprocessData(data, addresses, metros);

    if (isFilled) {
      
      if (isPersonal) {

        addNewItem(data).then((res) => {
          if (res) {
            setIsFilled(false);
          } else {
            setIsFilled(false);
          }

          reportAboutSubmit();

        }).catch(() => {
          console.log("Не удалось добавить объявление");
        })

      } else {

        registrate(data).then((res) => {
          data.set("id", user.id);
          
          if (res) {
            setIsFilled(true);
            navige("../enter");
  
          } else {
            setIsFilled(false);
          }
        }).catch(() => {
          console.log("Не удалось зарегистрироваться");
        })
      }

    } else {
      setIsFilled(false);
    }

    event.preventDefault();
  }, [user])

  const targetChangeHandle = useCallback((event: any) => {
    if (event.target.value === "person") {
      setIsHouse(true);
    } else {
      setIsHouse(false);
    }
  }, [])

  return {
    formRef,
    isFilled,
    submitChanges,
    goToRegistration,
    signUp,
    isHouse,
    targetChangeHandle,
    addresses,
    metros
  }
}