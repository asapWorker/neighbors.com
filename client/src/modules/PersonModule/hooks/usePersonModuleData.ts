import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../../contexts/useUserContext";

import {
  PersonalHouseItem,
  PersonalPersonItem,
} from "../../../types/ItemTypes";
import { getPersonalItemData } from "../api/getPersonalItemData";

export const usePersonModuleData = () => {
  const user = useUser();

  const [baseData, setBaseData] = useState<
    PersonalHouseItem | PersonalPersonItem
  >(null);

  const [isForm, setIsForm] = useState<boolean>(false);

  useEffect(() => {
    console.log("PERSONAL");
    if (!isForm) {
      console.log(isForm);
      getPersonalItemData(user.id)
        .then((res) => {
          console.log(res)
          setBaseData(res);
        })
        .catch(() => {
          console.log(null);
          setBaseData(null);
        });
    }
  }, [isForm]);

  const deleteItem = useCallback(() => {
    setBaseData(null);
  }, []);

  const openForm = useCallback(() => {
    setIsForm(true);
  }, []);

  const closeForm = useCallback(() => {
    getPersonalItemData(user.id)
      .then((res) => {
        setBaseData(JSON.parse(res));
        setIsForm(false);
      })
      .catch(() => {
        setBaseData(null);
        setIsForm(false);
      });
  }, []);

  return {
    user,
    baseData,
    isForm,
    deleteItem,
    openForm,
    closeForm,
  };
};
