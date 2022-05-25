// src/context/state.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserContextWrapper({ children }) {
  let initialCtx = {
    chainId: 1,
    address: '0x00',
    connected: false,
    isHolder: false,
    holderToken: '' 
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