import { Sex } from "../../../constants/constants";

export interface HouseItem {
  id: string;
  address: string;
  sex: Sex;
  metro: string[];
  money: number;
  mark: number;
}