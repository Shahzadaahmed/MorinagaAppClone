import React, {useState, createContext, useContext} from 'react';

const Context = createContext();
export const useLoading = () => useContext(Context);

export const LoadingProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{loading, setLoading}}>
      {children}
    </Context.Provider>
  );
};
