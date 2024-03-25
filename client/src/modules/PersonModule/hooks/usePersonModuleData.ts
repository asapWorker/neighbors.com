import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../../contexts/useUserContext";

import { BaseHouseItem, BasePersonItem } from "../../../types/ItemTypes";
import { getPersonalItemData } from "../api/getPersonalItemData";

export const usePersonModuleData = () => {
  const user = useUser();
  const [baseData, setBaseData] = useState<
    (BaseHouseItem & { type: string }) | (BasePersonItem & { type: string })
  >(null);

  const [isForm, setIsForm] = useState<boolean>(false);

  useEffect(() => {
    if (!isForm) {
      getPersonalItemData(user.id).then((res) => {
        setBaseData(JSON.parse(res));
      }).catch(() => {setBaseData(null)})
    }
  }, [isForm])

  const deleteItem = useCallback(() => {
    setBaseData(null);
  }, [])

  const openForm = useCallback(() => {
    setIsForm(true);
  }, [])

  const closeForm = useCallback(() => {
    getPersonalItemData(user.id).then((res) => {
      setBaseData(JSON.parse(res));
      setIsForm(false);
    }).catch(() => {setBaseData(null)})
  }, [])

  return {
    user,
    baseData,
    isForm,
    deleteItem,
    openForm,
    closeForm
  }
};
