import React from 'react';

import './App.scss';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodosList } from './components/TodosList/TodosList';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <TodosList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

export default App;
