import { createContext, useContext } from "react";
import { useUser, userInitialState } from "../hooks/useUser";

const UserContext = createContext(userInitialState);

export const UserContextProvider = ({ children }) => {
  const userProviderState = useUser();

  return (
    <UserContext.Provider value={userProviderState}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
