import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import World from '@components/World';
import Race from '@components/Race';

import style from './App.scss';

export const App = (): JSX.Element => (
  <div className={style.componentWrapper}>
    <h2>Hello App</h2>
    <BrowserRouter>
      <nav className={style.routingWrapper}>
        <b>Routing: </b>
        <Link to="/">Hello component</Link>
        <Link to="/world">World component</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Race />} />
        <Route path="/world" element={<World />} />
      </Routes>
    </BrowserRouter>
  </div>
);
