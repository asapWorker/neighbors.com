import { BasePersonItem } from "../../ItemListModule/types/personType";

export interface BasePersonalItem extends BasePersonItem {
  login: string;
  password: string;
}