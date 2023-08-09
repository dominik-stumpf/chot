'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';

interface CustomContextProps {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

interface SocketProviderProps {
  children: ReactNode;
}

export const CustomContext = createContext<CustomContextProps>(
  {} as CustomContextProps,
);

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<null | Socket>(null);

  return (
    <CustomContext.Provider value={{ socket, setSocket }}>
      {children}
    </CustomContext.Provider>
  );
}
