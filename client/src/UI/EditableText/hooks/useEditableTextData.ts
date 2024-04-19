import { useCallback, useState } from "react";
import { BoundedItem } from "../../../modules/ItemModule/types/BoundedItem";

export const useEditableTextData = (
  defaultValue: string,
  saveChanges: (val: any) => boolean | null,
  isWithRating: boolean,
  areMark: boolean,
  options: string[] | BoundedItem[]
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curValue, setCurValue] = useState<string | BoundedItem>(
    options ? options[0] : ""
  );
  const [value, setValue] = useState<string>(defaultValue);
  const [curRating, setCurRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(Number(defaultValue));

  const edit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const textChangeHandle = useCallback(
    (event: any) => {
      if (event.target.selectedOptions) {
        const arr = Array.from(
          event.target.selectedOptions,
          (option: any) => option.value
        );
        setCurValue(options[parseInt(arr[0])]);
      } else {
        setCurValue(event.target.value);
      }
    },
    [setCurValue, isWithRating, options]
  );

  const ratingChangeHandle = useCallback(
    (event: any) => {
      let val = event.target.value;
      if ((areMark && val < 0) || (areMark && val < -1)) {
        val = areMark ? 0 : -1;
      } else if (val > 5) {
        val = 5;
      }

      setCurRating(val);
    },
    [setCurRating]
  );

  const submitChange = useCallback(() => {
    if (curValue !== "") {
      
      if (!areMark) {
        const isConfirmed = confirm(
          isWithRating && curRating < 0
            ? "Вы действительно хотите удалить эту связь"
            : "Вы действительно хотите изменить значение поля?"
        );
        if (!isConfirmed) return false;
      }

      if (areMark) {
        setRating(curRating);
        saveChanges(curRating);
        
      } else if (isWithRating && typeof curValue !== "string") {
        if (value !== "нет") {
          const newValue = new Set(value.split(", "));

          if (curRating < 0) {
            if (newValue.has(curValue.login)) {
              newValue.delete(curValue.login);
            }
          } else {
            newValue.add(curValue.login);
          }
          setValue(Array.from(newValue).join(", "));
        } else {
          setValue(curValue.login);
        }
        saveChanges({
          item: curValue,
          rating: curRating,
        });
      } else if (typeof curValue !== "object") {
        setValue(curValue);
        saveChanges(curValue);
      }

      setIsEditing(false);
    } else if (isWithRating && curRating) {
      if (saveChanges(curRating)) {
        setRating(curRating);
        setIsEditing(false);
      }
    }
  }, [curValue, curRating]);

  const resetChange = useCallback(() => {
    setIsEditing(false);
  }, []);

  return {
    isEditing,
    value,
    rating,
    curValue,
    curRating,
    edit,
    textChangeHandle,
    submitChange,
    resetChange,
    ratingChangeHandle,
  };
};
