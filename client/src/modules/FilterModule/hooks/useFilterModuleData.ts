import { useCallback, useRef, useState } from "react";
import { FilterSettings } from "../../../types/FilterSettings";
import { Sex, SortBy } from "../../../constants/constants";

// form fields
const SEX_FIELD = "sex";
const SORT_BY_FIELD = "money";
const METRO_FIELD = "metro";

// map
const SexMap = {
  any: Sex.Any,
  male: Sex.Male,
  female: Sex.Female,
};

const SortByMap = {
  aschending: SortBy.Ascending,
  decending: SortBy.Decending,
};

export const useFilterModuleData = (
  isHouse: boolean,
  setFilterSettings: (settings: FilterSettings) => void
) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSave = useCallback((event: any) => {
    event.preventDefault();

    let formData = new FormData(formRef.current);
    const inputSex = formData.get(SEX_FIELD).toString();
    const inputSortBy = formData.get(SORT_BY_FIELD).toString();
    const inputMetro = isHouse
      ? Array.from(formData.getAll(METRO_FIELD)).map((item) => item.toString())
      : null;

    if (isHouse) {
      setFilterSettings({
        sex: SexMap[inputSex],
        sortBy: SortByMap[inputSortBy],
        metro: inputMetro,
      });
    } else {
      setFilterSettings({
        sex: SexMap[inputSex],
        sortBy: SortByMap[inputSortBy],
      });
    }
  }, []);

  return {
    formRef,
    handleSave,
  };
};
