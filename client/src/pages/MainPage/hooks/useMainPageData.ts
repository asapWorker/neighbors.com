import { useCallback, useEffect, useState } from "react";
import { FilterSettings } from "../../../types/FilterSettings";
import { Sex, SortBy } from "../../../constants/constants";

export const useMainPageData = () => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    sex: Sex.Any,
    sortBy: SortBy.Ascending
  });
  const [isHouse, setIsHouse] = useState<boolean>(true);

  const changeList = useCallback((isHouse: boolean) => {
    setIsHouse(isHouse);
  }, [])

  const openFilter = useCallback(() => {
    setIsFilter(true);
  }, [])

  const setFilterSettingsAndClose = useCallback((settings: FilterSettings) => {
    setFilterSettings(settings);
    setIsFilter(false);
  }, [])

  return {
    isHouse,
    isFilter,
    filterSettings,
    changeList,
    openFilter,
    setFilterSettingsAndClose
  }
}