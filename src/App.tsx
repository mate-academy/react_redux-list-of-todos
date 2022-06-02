import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { getTodosSelector, getUserIdSelector } from './store';

const App: React.FC = () => {
  const selectedUserId = useSelector(getUserIdSelector);
  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const todosFromServer = async () => {
      dispatch({ type: 'TODOS_LOADING', todos: await getTodos() });
    };

    todosFromServer();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selctedUser={selectedUserId}
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
