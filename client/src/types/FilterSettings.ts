import { Sex, SortBy } from "../constants/constants";

export interface FilterSettings {
  sex: Sex;
  sortBy: SortBy;
  metro?: string[];
}