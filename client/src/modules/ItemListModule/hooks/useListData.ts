import { useCallback, useContext, useEffect, useState } from "react";
import { HouseItem } from "../types/houseType";
import { PersonItem } from "../types/personType";
import { getShortHousesInfo, getShortPersonsInfo } from "../api/getShortInfo";
import { FilterSettings } from "../../../types/FilterSettings";
import { Sex, SortBy } from "../../../constants/constants";

const REPLICATION = 3;

async function getList<T>(callback: () => Promise<T[]>): Promise<T[]> {
  for (let i = 0; i < REPLICATION; i++) {
    try {
      const list = await callback();
      return list;
    } catch {
      continue;
    }
  }
}

export const useListData = () => {
  const [houseList, setHouseList] = useState<HouseItem[]>(null);
  const [personList, setPersonList] = useState<PersonItem[]>(null);

  useEffect(() => {
    getList(getShortHousesInfo)
      .then((list) => {
        setHouseList(list);
      })
      .catch(() => {
        setHouseList(null);
      });

    getList(getShortPersonsInfo)
      .then((list) => {
        setPersonList(list);
      })
      .catch(() => {
        setPersonList(null);
      });
  }, []);

  const sort = useCallback((settings: FilterSettings, list: any[]) => {
    let sortedList = list;

    if (list && settings) {

      if (settings.sex !== Sex.Any) {
        sortedList = sortedList.filter((item: HouseItem & PersonItem) => {
          return settings.sex === item.sex;
        });
      }

      if (sortedList.length && ("sortBy" in settings)) {
        sortedList.sort(
          (a: HouseItem & PersonItem, b: HouseItem & PersonItem) => {
            if (settings.sortBy === SortBy.Ascending) {
              return a.money - b.money;
            } else {
              return b.money - a.money;
            }
          }
        );
      }

      if (sortedList.length && ("metro" in sortedList[0]) && settings.metro?.length) {
        sortedList = sortedList.filter((item: HouseItem & PersonItem) => {
          return (
            settings.metro.length + item.metro.length >
            new Set([...item.metro, ...settings.metro]).size
          );
        });
      }

    }

    return sortedList;
  }, []);

  return {
    houseList,
    personList,
    sort
  };
};
