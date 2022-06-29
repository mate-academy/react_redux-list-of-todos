import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          userId={userId}
          setUserId={setUserId}
        />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser
            setUserId={setUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
