import { RegisterModal } from '@components/RegisterModal';
import React, { useState } from 'react';
import { Room } from 'src/types';

interface LobbyProps {
  registerUser: (name: string) => void;
  createRoom: (roomName: string) => void;
  joinRoom: (roomName: string) => void;
  getRooms: () => void;
  roomsList: Room[];
  leaveRoom: () => void;
  socketID: string;
  handleSendMessage: (message: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({
  registerUser,
  createRoom,
  joinRoom,
  roomsList,
  getRooms,
  leaveRoom,
  socketID,
  handleSendMessage,
}) => {
  const [inputRoom, setInputRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [currentRoomName, setCurrentRoomName] = useState<string>('');
  console.log('socketID', socketID);

  const handlerJoinRoom = (roomName: string) => {
    setCurrentRoomName(roomName);
    joinRoom(roomName);
  };

  const handlerCreateRoom = (roomName: string) => {
    if (currentRoomName) {
      leaveRoom();
    }
    setCurrentRoomName(roomName);
    createRoom(roomName);
  };

  const handlerLeaveRoom = () => {
    setCurrentRoomName('');
    leaveRoom();
  };

  console.log('roomsList', roomsList);
  return (
    <div>
      <RegisterModal registerUser={registerUser} getRooms={getRooms} />
      <div>
        <div>
          {roomsList.map((room) => (
            <div key={room.roomName}>
              <div>{room.roomName}</div>
              <div>
                {room.players?.map((player, i) => (
                  <div key={i}>
                    Игрок {i + 1}: {player.username}
                  </div>
                ))}
              </div>
              {!currentRoomName && (
                <button onClick={() => handlerJoinRoom(room.roomName)}>Подключиться к комнате</button>
              )}
              {currentRoomName === room.roomName && <button onClick={handlerLeaveRoom}>Покинуть комнату</button>}
              {socketID === room.creatorId && <button disabled={room.players.length < 2}>Начать игру</button>}
            </div>
          ))}
        </div>
        {
          <div>
            <input onChange={(e) => setInputRoom(e.target.value)} value={inputRoom} type="text" />
            <button onClick={() => handlerCreateRoom(inputRoom)}>Создать комнату</button>
          </div>
        }
        <div>
          <input onChange={(e) => setMessage(e.target.value)} value={message} type="text" />
          <button onClick={() => handleSendMessage(message)}>отправить сообщение в комнату</button>
        </div>
      </div>
    </div>
  );
};
