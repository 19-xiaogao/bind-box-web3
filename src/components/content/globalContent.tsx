import React, { createContext, useContext } from "react";

export const GlobalContext = createContext({
    isExitMetamask: false,
    isConnected: false,
    connectToEthNetWork: () => null,
});

export const useGlobalState = () => useContext(GlobalContext);
