import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

import './styles/general.scss';
import './App.scss';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const onChange = (child: Todo) => {
    const copyChild = { ...child };
    const copy = [...todos];
    const index = todos.findIndex(todo => todo.id === child.id);

    copy.splice(index, 1);
    copyChild.completed = !child.completed;
    setTodos([
      ...copy,
      copyChild,
    ].sort((a, b) => a.id - b.id));
  };

  const getServerTodos = async () => {
    const response = await getTodos();

    setTodos(response);
  };

  const selectUser = (id: number) => {
    setSelectedUserId(id);
  };

  useEffect(() => {
    getServerTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectUser={selectUser}
          onChange={onChange}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              id={selectedUserId}
              selectUser={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
