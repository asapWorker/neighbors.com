import { useCallback, useState } from "react";
import { BoundedItem } from "../../../modules/ItemModule/types/BoundedItem";
import { Address } from "../../../types/AddressType";
import { MetroType } from "../../../types/MetroType";

export const useEditableTextData = (
  defaultValue: string,
  saveChanges: (val: any) => boolean | null,
  isWithRating: boolean,
  areMark: boolean,
  options: string[] | BoundedItem[] | Address[] | MetroType[]
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curValue, setCurValue] = useState<string | BoundedItem | Address | MetroType>(
    options ? defaultValue : ""
  );
  const [curNum, setCurNum] = useState<number | string>(-1);

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

        const option = options[parseInt(arr[0])];
        
        if (typeof option === "string") {
          setCurNum(parseInt(arr[0]) + 1);
        } else {
          setCurNum(option.id);
        }

        setCurValue(options[parseInt(arr[0])]);

      } else {
        setCurValue(event.target.value);
      }
    },
    [setCurValue, isWithRating, options]
  );

  const ratingChangeHandle = useCallback(
    (event: any) => {
      let val = parseInt(event.target.value);
      
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
        
      } else if (isWithRating) {
        let curVal: BoundedItem | Address | MetroType;
        const option: BoundedItem = options[0] as BoundedItem;

        if (typeof curValue === "object") {
          curVal = curValue;
        } else {
          curVal = option;
        }

        if (value !== "нет") {
          const newValue = new Set(value.split(", "));

          if (curRating < 0) {
            if (newValue.has(curVal.name)) {
              newValue.delete(curVal.name);
            }
          } else {
            newValue.add(curVal.name);
          }
          setValue(Array.from(newValue).join(", "));
        } else {
          setValue(curVal.name);
        }

        saveChanges({
          item: curVal,
          rating: curRating,
        });
      } else if (typeof curValue !== "object") {
        setValue(curValue);

        if (options) {
          if (curNum === -1) {
            const option = options[0];
            let num = "1";

            if (typeof option !== "string") {
              num = option.id;
              setValue(option.name);
            } else {
              setValue(option);
            }

            saveChanges(num);
            
          } else {
            saveChanges(curNum);
            setValue(curValue);
          }
        } else {
          saveChanges(curValue);
        }
      } else {
        if (options) {
          if (curNum === -1) {
            const option = options[0];
            let num = "1";

            if (typeof option !== "string") {
              num = option.id;
              setValue(option.name);
            } else {
              setValue(option);
            }

            saveChanges(num);
            
          } else {
            saveChanges(curNum);
            setValue(curValue.name);
          }
        } else {
          saveChanges(curValue);
        }
      }

      setIsEditing(false);
    } else if (isWithRating && curRating) {
      if (saveChanges(curRating)) {
        setRating(curRating);
        setIsEditing(false);
      }
    }
  }, [curValue, curRating, curNum]);

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
