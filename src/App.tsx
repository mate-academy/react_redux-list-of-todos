import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((res) => setTodos(res));
  }, []);

  const clearUser = useCallback(() => {
    setSelectedUserId(0);
  }, []);

  const randomize = useCallback(() => {
    const randomizedArr = todos.sort(
      () => {
        if (Math.random() > 0.5) {
          return 1;
        }

        return -1;
      },
    );

    setTodos([...randomizedArr]);
  }, [todos]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          randomize={randomize}
          setSelectedUserId={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
