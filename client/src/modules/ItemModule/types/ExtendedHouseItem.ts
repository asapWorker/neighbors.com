import { YesNo } from "../../../constants/constants";
import { HouseType } from "../../../constants/constants";
import { HouseItem } from "../../ItemListModule/types/houseType";

export interface ExtendedHouseItem extends HouseItem {
  type: HouseType;
  smoking: YesNo;
  boundedItems: string[];
  animals: YesNo;
}