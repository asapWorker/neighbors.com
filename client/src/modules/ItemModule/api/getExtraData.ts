import { AttitudeTowardSmoking, HouseType, YesNo } from "../../../constants/constants";

async function getExtraData(item: string, id: string) {
  const response = await fetch(
    `http://localhost:8080/item?` + new URLSearchParams({ item, id }),

    {
      method: "GET",
    }
  );

  let result = await response.json();

  return result;
}

export async function getExtraHouseData(id: string) {
  const res = await getExtraData('house', id);

  return {
    mark: res.mark,
    type: HouseType[res.type],
    smoking: res.smokingAllowed ? YesNo.Yes : YesNo.No,
    boundedItems: res.boundedItems,
    animals: res.animals ? YesNo.Yes : YesNo.No
  }
}

export async function getExtraPersonData(id: string) {
  const res = await getExtraData('person', id);

  return {
    mark: res.mark,
    attitudeTowardSmoking: AttitudeTowardSmoking[res.attitudeTowardSmoking],
    boundedItems: res.boundedItems,
    animals: res.animals ? YesNo.Yes : YesNo.No
  }
}