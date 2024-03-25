import { FunctionComponent, createContext, useContext } from "react";
import { UserData } from "../hooks/useUserData";
import { User } from "../constants/constants";

interface UserContextType {
  user: UserData;
  changeUser: (
    type: User,
    id: string,
    isLookingForHouse: boolean,
    isLookingForPerson: boolean
  ) => void;
  isLookingForHouse: boolean;
  isLookingForPerson: boolean;
}

interface UserContextProviderProps extends UserContextType {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>(null);

export const useUser = () => {
  return {
    type: useContext(UserContext).user.type,
    id: useContext(UserContext).user.id,
  };
};

export const useIsLookingForData = () => {
  return {
    isLookingForHouse: useContext(UserContext).isLookingForHouse,
    isLookingForPerson: useContext(UserContext).isLookingForPerson,
  };
};

export const useChangeUser = () => {
  return { changeUser: useContext(UserContext).changeUser };
};

export const UserContextProvider: FunctionComponent<
  UserContextProviderProps
> = ({ children, user, isLookingForHouse, isLookingForPerson, changeUser }) => {
  return (
    <UserContext.Provider
      value={{ user, isLookingForHouse, isLookingForPerson, changeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};