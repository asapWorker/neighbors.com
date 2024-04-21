import { Sex } from "../../../constants/constants";
import { HouseItem } from "../types/houseType";
import { PersonItem } from "../types/personType";

export async function getShortInfos(): Promise<[PersonItem[], HouseItem[]]> {
  const response = await fetch(
    `http://localhost:8080/`,

    {
      method: "GET",
    }
  );

  let result = await response.json();

  for (let i = 0; i < 2; i++) {
    result[i] = result[i].map((item: any) => {
      return {
        ...item,
        sex: Sex[item.sex],
      }
    })
  }

  return result;
}
