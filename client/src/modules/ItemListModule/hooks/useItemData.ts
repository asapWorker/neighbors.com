import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/useUserContext";
import { HouseItem } from "../types/houseType";
import { PersonItem } from "../types/personType";

export const useItemData = () => {
  const {user} = useUser();
  const navigate = useNavigate();

  const handleItemClick = useCallback((data: HouseItem | PersonItem, isHouse: boolean) => {
    navigate("/" + user + "/item/" + (isHouse ? "house/" : "person/") + JSON.stringify(data));
  }, [user])

  return {
    handleItemClick
  }
}