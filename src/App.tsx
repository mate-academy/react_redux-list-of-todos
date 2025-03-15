import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <TodoFilter />
      <TodoList />
      <TodoModal />
    </div>
  );
};
