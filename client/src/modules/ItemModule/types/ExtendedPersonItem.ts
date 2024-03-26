import { AttitudeTowardSmoking, YesNo } from "../../../constants/constants";
import { PersonItem } from "../../ItemListModule/types/personType";

export interface ExtendedPersonItem extends PersonItem {
  attitudeTowardSmoking: AttitudeTowardSmoking;
  boundedItems: string[];
  animals: YesNo;
}