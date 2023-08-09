'use client';

import { SocketContext } from '../../socket-provider';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';

interface MessageType {
  timestamp: number;
  data: string;
  socketID: string;
}

interface ResponseMessage {
  message: MessageType;
}

export default function Page() {
  const [messages, setMessages] = useState<ResponseMessage[]>([]);
  const listRef = useRef<null | HTMLUListElement>(null);
  const { socket, socketID } = useContext(SocketContext);
  const router = useRouter();

  if (socket === null) {
    return;
  }

  useEffect(() => {
    if (socket === null) {
      router.push('/');
    }
  }, [socket]);

  useEffect(() => {
    socket.on('m', (message: ResponseMessage) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on('connect_error', (error) => {
      console.log(`socket connection error: ${error.message}`);
    });
  }, []);

  const sendMessage = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const message = event.currentTarget.value;
    if (event.key === 'Enter' && !event.shiftKey && message.trim() !== '') {
      event.preventDefault();
      socket.emit('m', message);
      event.currentTarget.value = '';
    }
  };

  useEffect(() => {
    if (listRef.current !== null) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const [brandText, setBrandText] = useState('chot');

  return (
    <main className={styles.main}>
      <Link
        href='/'
        onClick={() => {
          socket.disconnect();
        }}
        onMouseOver={() => {
          setBrandText('back');
        }}
        onMouseLeave={() => {
          setBrandText('chot');
        }}
      >
        <h1>{brandText}&nbsp;~</h1>
      </Link>
      <ul className={styles.list} ref={listRef}>
        {messages.map(({ message }) => {
          return (
            <li
              key={message.timestamp}
              className={socketID === message.socketID ? styles.dim : ''}
            >
              {message.data}
            </li>
          );
        })}
      </ul>
      <textarea
        className={styles.textInput}
        rows={1}
        onKeyDown={sendMessage}
        // rome-ignore lint/a11y/noAutofocus: <explanation>
        autoFocus={true}
      />
    </main>
  );
}
