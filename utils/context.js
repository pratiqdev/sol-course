// src/context/state.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserContextWrapper({ children }) {
  let initialCtx = {
    user_address: '0x00'
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