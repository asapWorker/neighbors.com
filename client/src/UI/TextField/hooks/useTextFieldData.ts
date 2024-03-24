import { ChangeEvent, useCallback, useState } from "react";

export const useTextFieldData = () => {
  const [value, setValue] = useState<string>("");

  const changeHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, [])

  return {
    value,
    changeHandle
  }
}