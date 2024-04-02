import { HouseType, Sex, YesNo } from "../../../constants/constants";

export async function getPersonalItemData(id: string) {
  const response = await fetch(
    `http://localhost:8080/person/item?` + new URLSearchParams({ id }),

    {
      method: "GET"
    },
  );

  let result = await response.json();

  result.animals = result.animals ? YesNo.Yes : YesNo.No;
  result.sex = Sex[result.sex];
  if ("type" in result) {
    result.type = HouseType[result.type]
  }

  return result;
}