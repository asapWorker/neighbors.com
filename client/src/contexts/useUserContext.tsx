import { FunctionComponent, createContext, useContext } from "react";

import { User } from "../constants/constants";

interface UserContextType {
  user: User;
  changeUser: (user: User) => void;
  isLookingForHouse: boolean;
}

interface UserContextProviderProps extends UserContextType {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>(null);

export const useUser = () => {
  return { user: useContext(UserContext).user, isLookingForHouse: useContext(UserContext).isLookingForHouse };
};

export const useChangeUser = () => {
  return { changeUser: useContext(UserContext).changeUser };
};

export const UserContextProvider: FunctionComponent<
  UserContextProviderProps
> = ({ children, user, isLookingForHouse, changeUser }) => {
  return (
    <UserContext.Provider value={{ user, isLookingForHouse, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};
