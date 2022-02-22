import React from 'react';
import {
  NavLink, Routes, Route,
} from 'react-router-dom';

import './App.scss';
import { TodosList } from './components/TodosList';
import { CurrentUser } from './components/CurrentUser';
import { HomePage } from './components/HomePage';

const App: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log('app render');

  return (
    <div className="App">
      <header>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'red' : 'blue')}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'red' : 'blue')}
            to="/todos"
          >
            Todos
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="todos" element={<TodosList />} />
        <Route path="user/:userId" element={<CurrentUser />} />
        <Route path="*" element={<div>Error</div>} />
      </Routes>

    </div>
  );
};

export default App;
