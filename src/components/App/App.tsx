import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import World from '@components/World';
import { Race } from '@components/Race';
import { Lobby } from '@components/Lobby';

import style from './App.scss';
import useChat from '../../ws/useChat';

export const App = (): JSX.Element => {
  const {
    createRoom,
    registerUser,
    getRooms,
    joinRoom,
    setMessage,
    handleSendMessage,
    roomsList,
    leaveRoom,
    socketID,
  } = useChat();
  return (
    <div className={style.componentWrapper}>
      <h2>Hello App</h2>
      <BrowserRouter>
        <nav className={style.routingWrapper}>
          <b>Routing: </b>
          <Link to="/">Hello component</Link>
          <Link to="/world">World component</Link>
          <Link to="/race">race</Link>
        </nav>
        <Routes>
          <Route path="/race" element={<Race />} />
          <Route
            path="/"
            element={
              <Lobby
                registerUser={registerUser}
                roomsList={roomsList}
                createRoom={createRoom}
                joinRoom={joinRoom}
                getRooms={getRooms}
                leaveRoom={leaveRoom}
                socketID={socketID}
                handleSendMessage={handleSendMessage}
              />
            }
          />
          <Route path="/world" element={<World />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
