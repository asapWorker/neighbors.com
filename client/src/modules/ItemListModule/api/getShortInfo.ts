import { Sex } from "../../../constants/constants";
import { HouseItem } from "../types/houseType";
import { PersonItem } from "../types/personType";

async function getShortInfo<T>(target: string): Promise<PersonItem[] & HouseItem[]> {
  const response = await fetch(
    `http://localhost:8080/?` + new URLSearchParams({ target }),

    {
      method: "GET",
    }
  );

  let result = await response.json();
  result = result.map((item: any) => {
    return {
      ...item,
      sex: Sex[item.sex],
      marks: item.mark
    }
  })

  return result;
}

export async function getShortPersonsInfo(): Promise<PersonItem[]> {
  return await getShortInfo("person-list");
}

export async function getShortHousesInfo(): Promise<HouseItem[]> {
  return await getShortInfo("house-list");
}
