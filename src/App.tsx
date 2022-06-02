import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  finishTodosLoading,
  getMessage,
  getSelectedUser,
  loadedTodos,
  startTodosLoading,
} from './store';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api/api';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const selectedUserId = useSelector(getSelectedUser);
  const message = useSelector(getMessage);

  const getTodos = useCallback(async () => {
    dispatch(startTodosLoading());

    try {
      const todosFromServer = await getTodosFromServer();

      dispatch(loadedTodos(todosFromServer));
    } catch {
      dispatch(finishTodosLoading('Download error'));
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  return (

    <div className="App">
      <div className="App__sidebar">
        <TodoList message={message} />
      </div>

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
