import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const defaultLoc = "USA"
    const [location, setLocation] = useState("");
    const [lastSearchedLoc, setLastSearchedLoc] = useState("");
    const [locRadius, setLocRadius] = useState("1");
    const [limit, setLimit] = useState("6");
    const [searchStatus, setSearchStatus] = useState("for_sale");


    const sharedState = {
        defaultLoc,
        location, setLocation,
        lastSearchedLoc, setLastSearchedLoc,
        locRadius, setLocRadius,
        limit, setLimit,
        searchStatus, setSearchStatus
    };

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}