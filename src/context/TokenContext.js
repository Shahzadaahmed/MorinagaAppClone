import React, { useState, createContext, useContext } from 'react';

const Context = createContext();
export const useToken = () => useContext(Context);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState([]);

  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
};
