import { useCallback, useState } from "react";

export const useExtraFormData = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);

  const openForm = useCallback(() => {
    setIsActive(true);
  }, [])

  const submitNewItem = useCallback(() => {

  }, [])

  return {
    isEmpty,
    isActive,
    openForm,
    submitNewItem
  }
}