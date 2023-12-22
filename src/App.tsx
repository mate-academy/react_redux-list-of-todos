import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>
          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            <TodoList setModel={setIsModelOpen} />
          </div>
        </div>
      </div>
      {
        isModelOpen && <TodoModal setModel={setIsModelOpen} />
      }
    </div>
  );
};
