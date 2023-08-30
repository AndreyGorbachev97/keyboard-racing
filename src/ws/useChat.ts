import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Room } from 'src/types';

const useChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState<string>('');
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [roomsList, setRoomsList] = useState<Room[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    console.log('connect');
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Обработчик события получения сообщения от сервера
      socket.on('receiveMessage', (message: string) => {
        setReceivedMessage(message);
      });

      // Обработчик для получения списка комнат от сервера
      socket.on('roomsList', (rooms: Record<string, any>) => {
        console.log('rooms', rooms);
        const toArray = Object.keys(rooms).map((room: string) => ({
          ...rooms[room],
          roomName: room,
        }));
        console.log('toArray', toArray);
        setRoomsList(toArray as Room[]);
      });

      // Обработчик для получения списка ошибок от серверв
      socket.on('error', (error: string) => {
        console.log('error', error);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', roomName, message);
    }
  };

  const createRoom = (roomName: string) => {
    console.log('createRoom', roomName);
    setRoomName(roomName);
    socket.emit('createRoom', roomName);
  };

  const registerUser = (name: string) => {
    socket.emit('registerUser', name);
  };

  const joinRoom = (roomName: string) => {
    // Логика для присоединения к существующей комнате
    // Вызываем handleJoinRoom при клике на кнопку или другое событие
    // Вместо 'room1' используйте имя комнаты, к которой хотите присоединиться
    socket.emit('joinRoom', roomName);
  };

  const getRooms = () => {
    socket.emit('getRooms');
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom');
  };

  return {
    message,
    receivedMessage,
    roomsList,
    setMessage,
    handleSendMessage,
    getRooms,
    leaveRoom,
    createRoom,
    registerUser,
    joinRoom,
    socketID: socket?.id || '',
  };
};

export default useChat;
