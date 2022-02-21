import React from 'react';
import './App.scss';
import {
  Routes, Route, NavLink,
} from 'react-router-dom';
import { TodosList } from './components/TodosList';
import { CurrentUser } from './components/CurrentUser';
import { HomePage } from './components/HomePage';

const App: React.FC = () => (
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
          to="/todos"
          className={({ isActive }) => (isActive ? 'red' : 'blue')}
        >
          Todos
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) => (isActive ? 'red' : 'blue')}
        >
          User
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

export default App;
