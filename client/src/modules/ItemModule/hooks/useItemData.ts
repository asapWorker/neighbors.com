import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExtendedHouseItem } from "../types/ExtendedHouseItem";
import { ExtendedPersonItem } from "../types/ExtendedPersonItem";
import { BaseHouseItem, BasePersonItem, PersonalHouseItem, PersonalPersonItem } from "../../../types/ItemTypes";
import { getExtraHouseData, getExtraPersonData } from "../api/getExtraData";
import {
  AttitudeTowardSmoking,
  HouseType,
  User,
  YesNo,
} from "../../../constants/constants";
import { getBoundedItemsList } from "../api/getBoundedItemsList";
import { useIsLookingForData } from "../../../contexts/useUserContext";
import { UserData } from "../../../hooks/useUserData";
import { changeFieldData } from "../api/changeFieldData";
import { deleteItemInfo } from "../api/deleteItem";
import { BoundedItem } from "../types/BoundedItem";

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
  user: UserData,
  type: string,
  defaultData:
    | ExtendedHouseItem
    | ExtendedPersonItem
    | PersonalHouseItem
    | PersonalPersonItem,
  isPersonal: boolean,
  reportDeletion: () => void
) => {
  const navigate = useNavigate();

  const { isLookingForHouse, isLookingForPerson } = useIsLookingForData();

  const [itemData, setItemData] = useState<
    ExtendedHouseItem | ExtendedPersonItem | BaseHouseItem | BasePersonItem
  >(null);

  const [isChanged, setIsChanged] = useState<boolean>(true);
  const [boundedItemsList, setBoundedItemsList] = useState<BoundedItem[]>([]);

  useEffect(() => {
    if (isPersonal) {
      setItemData(defaultData);
      return;
    }

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
            animals: YesNo;
          }) => {
            baseData.type = obj.type;
            baseData.smoking = obj.smoking;
            baseData.boundedItems = obj.boundedItems;
            baseData.mark = obj.mark;
            baseData.animals = obj.animals;
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
            animals: YesNo;
          }) => {
            baseData.attitudeTowardSmoking = obj.attitudeTowardSmoking;
            baseData.boundedItems = obj.boundedItems;
            baseData.animals = obj.animals
            baseData.mark = obj.mark;
            setItemData(baseData);
          }
        )
        .catch(() => {
          setItemData(baseData);
          setIsChanged(false);
        });
    }

    getExtraData(getBoundedItemsList)
      .then((list) => {
        setBoundedItemsList(list);
      })
      .catch(() => {
        setBoundedItemsList([]);
      });
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
        setItemData(null);
        reportDeletion();
        
        if (!isPersonal) {
          navigate("..");
        }
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
    isEditable: user?.type === User.Admin || isPersonal,
    isHouse: type === "house" ? true : false,
    isClient: user?.type === User.Client,
    itemData,
    setNewData,
    chooseHandle,
    deleteHandle,
    boundedItemsList,
    isHouseBtnIsVisible: isLookingForHouse && (type === "person" ? true : false),
    isPersonBtnIsVisible: isLookingForPerson && (type === "house" ? true : false)
  };
};
