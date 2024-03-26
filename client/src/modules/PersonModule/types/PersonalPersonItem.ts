import { AttitudeTowardSmoking, YesNo } from "../../../constants/constants";
import { BasePersonItem } from "../../../types/ItemTypes";

export interface PersonalPersonItem extends BasePersonItem {
  attitudeTowardSmoking: AttitudeTowardSmoking;
  animals: YesNo;
  type: string;
}