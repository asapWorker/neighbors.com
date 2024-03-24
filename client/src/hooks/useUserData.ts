import { useCallback, useState } from "react"
import { User } from "../constants/constants"

export const useUserData = () => {
  const [user, setUser] = useState<User>(User.Guest);
  const [isLookingForHouse, setIsLookingForHouse] = useState<boolean>(false);

  const changeUser = useCallback((newUser: User, isLookingForHouse: boolean = false) => {
    setUser(newUser);
    setIsLookingForHouse(isLookingForHouse);
  }, [])

  return {
    user,
    isLookingForHouse,
    changeUser
  }
}