import React from 'react';
import {
  NavLink, Routes, Route,
} from 'react-router-dom';
import { TodosList } from './components/TodosList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Redux Toolkit</h1>

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
          <NavLink
            className={({ isActive }) => (isActive ? 'red' : 'blue')}
            to="/user"
          >
            User
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="user" element={<CurrentUser />} />
        <Route path="todos" element={<TodosList />} />
        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </div>
  );
};

export default App;
