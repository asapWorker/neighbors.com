import { UserData } from "../../../hooks/useUserData";
import {
  BaseHouseItem,
  BasePersonItem,
  ExtendedHouseItem,
  ExtendedPersonItem,
} from "../../../types/ItemTypes";

export async function chooseItem(
  user: UserData,
  type: string,
  itemData:
    | ExtendedHouseItem
    | ExtendedPersonItem
    | BaseHouseItem
    | BasePersonItem
) {
  try {
    const response = await fetch(
      `http://localhost:8080/item/choose?` + new URLSearchParams({ type }),

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          user,
          itemData,
        }),
      }
    );

    return true;
  } catch {
    console.log("не удается изменить поле");
    return false;
  }
}
