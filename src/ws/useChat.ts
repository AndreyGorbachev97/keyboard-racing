import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomsList, setRoomsList] = useState([]);

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
      socket.on('roomsList', (rooms: string[]) => {
        setRoomsList(rooms);
      });

      socket.on('error', (error: string) => {
        console.log('error', error);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', message);
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

  const handleJoinRoom = (roomName: string) => {
    // Логика для присоединения к существующей комнате
    // Вызываем handleJoinRoom при клике на кнопку или другое событие
    // Вместо 'room1' используйте имя комнаты, к которой хотите присоединиться
    socket.emit('joinRoom', roomName);
  };

  const getRooms = () => {
    socket.emit('getRooms');
  };

  return {
    message,
    receivedMessage,
    roomsList,
    setMessage,
    handleSendMessage,
    getRooms,
    createRoom,
    registerUser,
    handleJoinRoom,
  };
};

export default useChat;
