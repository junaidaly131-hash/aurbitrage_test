import React, { createContext, useContext } from "react";
import useSpotPricesHook from "@/pages/posting-board/Hooks/useGetSpotPrices";

const SpotPricesContext = createContext();

export const SpotPricesProvider = ({ children }) => {
  const { spotPrices, loading } = useSpotPricesHook();

  return (
    <SpotPricesContext.Provider value={{ spotPrices, loading }}>
      {children}
    </SpotPricesContext.Provider>
  );
};

export const useSpotPrices = () => useContext(SpotPricesContext);
