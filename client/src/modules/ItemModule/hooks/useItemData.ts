import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExtendedHouseItem } from "../types/ExtendedHouseItem";
import { ExtendedPersonItem } from "../types/ExtendedPersonItem";
import { getExtraHouseData, getExtraPersonData } from "../api/getExtraData";
import {
  AttitudeTowardSmoking,
  HouseType,
  User,
  YesNo,
} from "../../../constants/constants";
import { getBoundedItemsList } from "../api/getBoundedItemsList";

const REPLICATION = 3;

async function getExtraData<T>(callback: () => Promise<T>): Promise<T> {
  for (let i = 0; i < REPLICATION; i++) {
    try {
      const extraData = await callback();
      return extraData;
    } catch {
      continue;
    }
  }
}

export const useItemData = (
  user: string,
  type: string,
  defaultData: Object
) => {
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<
    ExtendedHouseItem & ExtendedPersonItem
  >(null);

  const [isChanged, setIsChanged] = useState<boolean>(true);
  const [boundedItemsList, setBoundedItemsList] = useState<string[]>([]);

  useEffect(() => {
    let baseData;

    if (type === "house") {
      baseData = { ...defaultData };

      getExtraData(getExtraHouseData.bind(this, baseData.id))
        .then(
          (obj: {
            type: HouseType;
            smoking: YesNo;
            boundedItems: string[];
            mark: number;
          }) => {
            baseData.type = obj.type;
            baseData.smoking = obj.smoking;
            baseData.boundedItems = obj.boundedItems;
            baseData.mark = obj.mark;
            setItemData(baseData);
          }
        )
        .catch(() => {
          setItemData(baseData);
          setIsChanged(false);
        });
    } else {
      baseData = { ...defaultData };

      getExtraData(getExtraPersonData.bind(this, baseData.id))
        .then(
          (obj: {
            attitudeTowardSmoking: AttitudeTowardSmoking;
            boundedItems: string[];
            mark: number;
          }) => {
            baseData.attitudeTowardSmoking = obj.attitudeTowardSmoking;
            baseData.boundedItems = obj.boundedItems;
            baseData.mark = obj.mark;
            setItemData(baseData);
          }
        )
        .catch(() => {
          setItemData(baseData);
          setIsChanged(false);
        });
    }

    getExtraData(getBoundedItemsList).then((list) => {
      setBoundedItemsList(list);
    }).catch(() => {
      setBoundedItemsList([]);
    })
  }, [isChanged]);

  const setNewData = useCallback(
    (field: string, value: any) => {
      const isConfirmed = confirm(
        "Вы действительно хотите изменить значение поля?"
      );
      if (!isConfirmed) return;

      if (itemData) {
        changeFieldData(type, itemData.id, field, value).finally(() => {
          setIsChanged(true);
        });
      }
    },
    [itemData]
  );

  const deleteHandle = useCallback(() => {
    const isConfirmed = confirm(
      "Вы действительно хотите удалить текущий элемент?"
    );
    if (!isConfirmed) return;

    if (itemData) {
      deleteItemInfo(type, itemData.id).finally(() => {
        navigate("..");
      });
    }
  }, [itemData]);

  const chooseHandle = useCallback(() => {
    const isConfirmed = confirm(
      "Вы действительно хотите выбрать этот элемент?"
    );
    if (!isConfirmed) return;

    navigate("..");
  }, []);

  return {
    isEditable: user === User.Admin,
    isHouse: type === "house" ? true : false,
    isClient: user === User.Client,
    itemData,
    setNewData,
    chooseHandle,
    deleteHandle,
    boundedItemsList
  };
};
