import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangeUser, useUser } from "../../../contexts/useUserContext";
import { User } from "../../../constants/constants";

const enum Text {
  Enter = "Войти",
  Exit = "Выйти"
}

export const useEnterPensonBtnsData = () => {
  const navigate = useNavigate();
  const user = useUser();
  const {changeUser} = useChangeUser();

  const [text, setText] = useState<Text>(Text.Enter);

  useEffect(() => {
    if (user.type === User.Guest) {
      setText(Text.Enter);
    } else {
      setText(Text.Exit);
    }
  }, [user])
  
  const handleEnterClick = useCallback(() => {
    if (user.type === User.Guest) {
      navigate("/enter");
    } else {
      const isConfirmed = confirm("Вы действительно хотите выйти?");
      if (!isConfirmed) return;

      changeUser(User.Guest, "", false, false);
      navigate("../");
    }
  }, [user])

  const handlePersonClick = useCallback(() => {
    if (!user || user.type === User.Guest) {
      return;
    } else {
      navigate("./personal account");
    }
  }, [user])

  return {
    text,
    handleEnterClick,
    handlePersonClick
  }
}