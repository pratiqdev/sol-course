// src/context/state.js
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalContextWrapper({ children }) {
  let initialCtx = {
    chainId: 1,
    address: null,
    connected: false,
    connecting: false,
    isHolder: false,
    isVerified: false,
    navOpen: true,
    instructionsOpen: true,
    progress: {
      AllCategoriesComplete: false
    }
  }
  const [ctx, setCtx] = useState(initialCtx)
  

  return (
    <GlobalContext.Provider value={{ctx, setCtx}}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}