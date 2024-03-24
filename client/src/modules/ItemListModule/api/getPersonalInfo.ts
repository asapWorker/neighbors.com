import { Sex } from "../../../constants/constants";
import { BasePersonalItem } from "../../ItemModule/types/BasePersonalItem";
import { ExtendedHouseItem } from "../../ItemModule/types/ExtendedHouseItem";
import { ExtendedPersonItem } from "../../ItemModule/types/ExtendedPersonItem";

export async function getPersonalInfo<T>(
  personId: string,
  houseId: string = null
): Promise<
  | (BasePersonalItem & ExtendedPersonItem)
  | (BasePersonalItem & ExtendedHouseItem)
> {
  const response = await fetch(
    `http://localhost:8080/personal?` + new URLSearchParams({ personId, houseId }),

    {
      method: "GET",
    }
  );

  let result = await response.json();
  result = result.map((item: any) => {
    return {
      ...item,
      sex: Sex[item.sex],
    };
  });

  return result;
}
