import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Pages/API/ApiConfig";
const BASE_URL = `${baseUrl}/api`;

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
