import React, {useState, createContext, useContext} from 'react';

const Context = createContext();
export const usePromotor = () => useContext(Context);

export const PromotorProvider = ({children}) => {
  const [bmi, setBmi] = useState();
  const [kcalMale, setKcalMale] = useState();
  const [kcalFemale, setKcalFemale] = useState();
  const [foodItems, setFoodItems] = useState();
  const [foodCategories, setFoodCategories] = useState();

  return (
    <Context.Provider
      value={{
        bmi,
        setBmi,
        kcalMale,
        setKcalMale,
        kcalFemale,
        setKcalFemale,
        foodItems,
        setFoodItems,
        foodCategories,
        setFoodCategories,
      }}>
      {children}
    </Context.Provider>
  );
};
