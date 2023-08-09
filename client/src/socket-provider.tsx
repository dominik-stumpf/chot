'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
  socketID: string | undefined;
  setSocketID: Dispatch<SetStateAction<string | undefined>>;
}

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
);

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [socketID, setSocketID] = useState<undefined | string>();

  return (
    <SocketContext.Provider
      value={{ socket, setSocket, socketID, setSocketID }}
    >
      {children}
    </SocketContext.Provider>
  );
}
