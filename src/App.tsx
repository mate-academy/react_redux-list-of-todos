import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api/api';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';
import {
  todosLoadErrorAC,
  todosLoadErrorSelector,
  loadTodosAC,
  loadTodosSelector,
  selectUserIdSelector,
} from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(loadTodosSelector);
  const selectedUserId = useSelector(selectUserIdSelector);
  const errorMessage = useSelector(todosLoadErrorSelector);

  useEffect(() => {
    async function response() {
      try {
        const todosFromServer = await getTodos();

        dispatch(loadTodosAC(todosFromServer));
      } catch {
        dispatch(todosLoadErrorAC('Cant load todos from server'));
      }
    }

    response();
  }, []);

  return (
    <div className="App">
      {!errorMessage ? (
        <div className="App__sidebar">
          {todos ? (
            <TodoList
              todos={todos}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
