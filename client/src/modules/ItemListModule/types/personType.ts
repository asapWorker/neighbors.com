import { Sex } from "../../../constants/constants";

export interface BasePersonItem {
  id: string;
  name: string;
  age: number;
  sex: Sex.Female | Sex.Male;
  money: number;
}

export interface PersonItem extends BasePersonItem {
  mark: number;
}