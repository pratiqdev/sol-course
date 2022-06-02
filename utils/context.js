// src/context/state.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserContextWrapper({ children }) {
  let initialCtx = {
    chainId: 1,
    address: null,
    connected: false,
    isHolder: false,
    navOpen: true,
    instructionsOpen: true
  }
  const [ctx, setCtx] = useState(initialCtx)
  

  return (
    <UserContext.Provider value={{ctx, setCtx}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}