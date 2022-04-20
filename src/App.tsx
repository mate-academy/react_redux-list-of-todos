import { useState } from 'react';

import './App.scss';
import './styles/general.scss';
import './styles/form.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};
