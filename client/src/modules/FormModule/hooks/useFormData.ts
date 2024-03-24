import { useCallback, useRef, useState } from "react";
import { useChangeUser, useUser } from "../../../contexts/useUserContext";
import { useNavigate } from "react-router-dom";
import { User } from "../../../constants/constants";


export const useFormData = () => {
  const navige = useNavigate();
  const {user} = useUser();

  const formRef = useRef<HTMLFormElement>(null);
  const {changeUser} = useChangeUser();
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [isHouse, setIsHouse] = useState<boolean>(true);


  const goToRegistration = useCallback(() => {
    navige("../registration");
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

    setIsFilled(isFilled);

    if (isFilled) {
      changeUser(User.Client);
      navige("..");
    }

    event.preventDefault();
  }, [])

  const signUp = useCallback((event: any) => {
    submitChanges(event);
  }, [])

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