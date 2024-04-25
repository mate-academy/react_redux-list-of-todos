/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
export const App: React.FC = () => {
  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">Todos:</h1>
          <div className="box">
            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <TodoList />
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
