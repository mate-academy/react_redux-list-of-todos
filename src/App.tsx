import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos</h1>
          <div className="block">
            <TodoFilter />
            <TodoList />
            {currentTodo && (
              <TodoModal />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
