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
  socketID: string | undefined;
  setSocketID: Dispatch<SetStateAction<string | undefined>>;
}

interface SocketProviderProps {
  children: ReactNode;
}

export const CustomContext = createContext<CustomContextProps>(
  {} as CustomContextProps,
);

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [socketID, setSocketID] = useState<undefined | string>();

  return (
    <CustomContext.Provider
      value={{ socket, setSocket, socketID, setSocketID }}
    >
      {children}
    </CustomContext.Provider>
  );
}
