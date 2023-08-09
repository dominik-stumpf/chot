import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

interface MessageType { timestamp: number, data: string, socketID: string }

class Message {
  private message: MessageType
  constructor(message: MessageType) {
    this.message = message;
  }
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const port = 3444;

function sendDummyText(socket: Socket) {
  for (let i = 0; i < 32; i += 1) {
    socket.emit('m', new Message({ data: `dummy text number ${i}`, timestamp: Date.now(), socketID: '' }))
  }
}

io.on('connection', (socket: Socket) => {
  console.log(`user connected ${socket.handshake.address}`);

  socket.emit('i', socket.id);

  socket.on('m', (message: string) => {
    io.emit('m', new Message({ data: message, timestamp: Date.now(), socketID: socket.id }))
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected ${socket.handshake.address}`);
  });
});

httpServer.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
