import './globals.css';
import { SocketProvider } from './socket-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Socket } from 'socket.io-client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta
          httpEquiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
      </head>
      <body className={inter.className}>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
