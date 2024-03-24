import { useCallback, useState } from "react";
import { YesNo } from "../../../constants/constants";

export const useEditableTextData = (
  defaultValue: string,
  saveChanges: (val: any) => void,
  isWithRating: boolean
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curValue, setCurValue] = useState<string | string[]>("");
  const [value, setValue] = useState<string | string[]>(defaultValue);
  const [curRating, setCurRating] = useState<number>(0);

  const edit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const textChangeHandle = useCallback((event: any) => {
    if (event.target.selectedOptions) {
      setCurValue(Array.from(event.target.selectedOptions, (option: any) => option.value));
    } else {
      setCurValue(event.target.value);
    }
  }, [setCurValue]);

  const ratingChangeHandle = useCallback((event: any) => {
    setCurRating(event.target.value);
  }, [setCurRating])

  const submitChange = useCallback(() => {
    if (curValue !== "") {
      if (isWithRating && typeof curValue === "string") {
        if (value !== 'нет') {
          setValue(value + ', ' + curValue);
        } else {
          setValue(curValue);
        }
        saveChanges({
          item: curValue,
          rating: curRating
        })
      } else {
        if (Array.isArray(curValue)) {
          setValue(curValue.join(', '));
        } else {
          setValue(curValue);
        }
        
        saveChanges(curValue);
      }
      
      setIsEditing(false);
    }
  }, [curValue, curRating]);

  const resetChange = useCallback(() => {
    setIsEditing(false);
  }, []);

  return {
    isEditing,
    value,
    curValue,
    curRating,
    edit,
    textChangeHandle,
    submitChange,
    resetChange,
    ratingChangeHandle
  };
};
