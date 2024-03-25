import { useCallback, useState } from "react"
import { User } from "../constants/constants"
export interface UserData {
  type: User,
  id: string
}

export const useUserData = () => {
  const [user, setUser] = useState<UserData>({type: User.Guest, id: ""});
  const [isLookingForHouse, setIsLookingForHouse] = useState<boolean>(false);
  const [isLookingForPerson, setIsLookingForPerson] = useState<boolean>(false);

  const changeUser = useCallback((type: User, id: string = "", isLookingForHouse: boolean = false, isLookingForPerson: boolean = false) => {
    setUser({
      type,
      id
    });
    setIsLookingForHouse(isLookingForHouse);
    setIsLookingForPerson(isLookingForPerson);
  }, [])

  return {
    user,
    isLookingForHouse,
    isLookingForPerson,
    changeUser
  }
}