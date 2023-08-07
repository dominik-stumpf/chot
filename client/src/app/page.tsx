'use client';

import styles from './page.module.css';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const hostURI = 'http://192.168.0.21';
const socket = io(hostURI);

interface MessageType {
  timestamp: number;
  data: string;
  socketID: string;
}

interface ResponseMessage {
  message: MessageType;
}

export default function Home() {
  const [messages, setMessages] = useState<ResponseMessage[]>([]);
  const clientID = useRef<string | undefined>(undefined);
  const listRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    socket.on('m', (message: ResponseMessage) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on('i', (responseID: string) => {
      clientID.current = responseID;
    });
    socket.on('connect_error', (error) => {
      console.log(`socket connection error: ${error.message}`);
    });
  }, []);

  function sendMessage(event: KeyboardEvent<HTMLTextAreaElement>) {
    const message = event.currentTarget.value;
    if (event.key === 'Enter' && !event.shiftKey && message.trim() !== '') {
      event.preventDefault();
      socket.emit('m', message);
      event.currentTarget.value = '';
    }
  }

  useEffect(() => {
    if (listRef.current !== null) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className={styles.main}>
      <h1>chot&nbsp;~</h1>
      <ul className={styles.list} ref={listRef}>
        {messages.map(({ message }) => {
          return (
            <li
              key={message.timestamp}
              className={
                clientID.current === message.socketID ? styles.dim : ''
              }
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
