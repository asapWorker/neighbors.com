import { useCallback, useRef, useState } from "react";
import { useChangeUser, useUser } from "../../../contexts/useUserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { enter } from "../api/enter";
import { registrate } from "../api/registrate";


export const useFormData = (isPersonal: boolean, reportAboutSubmit: () => void) => {
  const navige = useNavigate();
  const user = useUser();

  const formRef = useRef<HTMLFormElement>(null);
  const {changeUser} = useChangeUser();
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [isHouse, setIsHouse] = useState<boolean>(true);


  const goToRegistration = useCallback(() => {
    navige("../registrate");
  }, [])

  /* !!!!! */
  const submitChanges = useCallback((event: any) => {
    const data = new FormData(formRef.current);

    let isFilled = true;

    data.forEach((val, name) => {
      if (val === "") {
        isFilled = false;
        return;
      } else if ((name === "password") && (val.toString().length < 8)) {
        isFilled = false;
        return;
      }
    })

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

    let isFilled = true;

    data.forEach((val, name) => {
      if (val === "") {
        isFilled = false;
        return;
      } else if ((name === "password") && (val.toString().length < 8)) {
        isFilled = false;
        return;
      }
    })

    if (isFilled) {
      data.set("id", user.id);

      registrate(data).then((res) => {
        if (res) {
          setIsFilled(true);

          if (isPersonal) {
            reportAboutSubmit();
          } else {
            navige("../enter");
          }

        } else {
          setIsFilled(false);
        }
      }).catch(() => {
        console.log("Не удалось зарегистрироваться");
      })
    } else {
      setIsFilled(false);
    }

    event.preventDefault();
  }, [user])

  const targetChangeHandle = useCallback((event: any) => {
    if (event.target.value === "target-house") {
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
    targetChangeHandle
  }
}