import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setCurrencySymbol("₹");
    else if (currency === "USD") setCurrencySymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, currencySymbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
