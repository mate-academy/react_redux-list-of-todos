import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getAllTodos()
      .then(result => setTodosFromServer(result))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error, 'something wrong here');
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todosFromServer={todosFromServer}
          selectUser={setSelectedUserId}
          selectedUserId={selectedUserId}
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

export default App;
