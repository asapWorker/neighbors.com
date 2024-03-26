import { YesNo } from "../../../constants/constants";
import { BaseHouseItem } from "../../../types/ItemTypes";

export interface PersonalHouseItem extends BaseHouseItem {
  smoking: YesNo;
  animals: YesNo;
  type: string;
}