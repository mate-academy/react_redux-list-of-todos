import React from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { getUserId } from './store/index';
import { TodoList } from './components/TodoLIst/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App = () => {
  const selectedUserId = useSelector(getUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
