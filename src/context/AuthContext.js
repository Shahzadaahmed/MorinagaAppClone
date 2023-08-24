import React, {useState, createContext, useContext} from 'react';

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  return (
    <Context.Provider value={{user, setUser}}>{children}</Context.Provider>
  );
};
