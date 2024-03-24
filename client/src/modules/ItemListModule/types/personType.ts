import { Sex } from "../../../constants/constants";

export interface BasePersonItem {
  id: string;
  name: string;
}

export interface PersonItem extends BasePersonItem {
  age: number;
  sex: Sex.Female | Sex.Male;
  mark: number;
  money: number;
}