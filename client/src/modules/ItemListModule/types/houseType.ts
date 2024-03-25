import { Sex } from "../../../constants/constants";

export interface BaseHouseItem {
  id: string;
  address: string;
  sex: Sex;
  metro: string[];
  money: number;
}

export interface HouseItem extends BaseHouseItem {
  mark: number;
}