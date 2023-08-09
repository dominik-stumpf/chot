'use client';

import { SocketContext } from '../socket-provider';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import io from 'socket.io-client';

export default function Page() {
  const router = useRouter();
  const { socket, setSocket, setSocketID } = useContext(SocketContext);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    for (const [key, value] of data.entries()) {
      if (key === 'host' && typeof value === 'string') {
        setSocket(io(value));
      }
    }
  };

  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.on('i', (response: string) => {
      setSocketID(response);
    });
    socket.on('connect', () => {
      router.push('/chat');
    });
  }, [socket]);

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor='host'>
          host
          <input type='text' id='host' name='host' placeholder='enter uri...' />
        </label>
        <input type='submit' value='join' />
      </form>
    </main>
  );
}
