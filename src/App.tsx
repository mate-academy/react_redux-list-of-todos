import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  finishTodosLoading,
  getLoadedTodos,
  getMessage,
  getSelectedUser,
  loadedTodos,
  selectedUser,
  startTodosLoading,
} from './store';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api/api';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const selectedUserId = useSelector(getSelectedUser);
  const todos = useSelector(getLoadedTodos);
  const message = useSelector(getMessage);

  const clearUser = useCallback(() => {
    dispatch(selectedUser(null));
  }, []);

  const getTodos = useCallback(async () => {
    dispatch(startTodosLoading());

    try {
      const todosFromServer = await getTodosFromServer();

      dispatch(loadedTodos(todosFromServer));
    } catch {
      dispatch(finishTodosLoading('Download error'));
    }
  }, []);

  const shuffleTodos = useCallback(() => {
    const shuffled = [...todos].sort(() => Math.random() - 0.5);

    dispatch(loadedTodos(shuffled));
  }, [todos]);

  useEffect(() => {
    getTodos();
  }, []);

  return (

    <div className="App">
      <div className="App__sidebar">
        <TodoList
          onShuffle={shuffleTodos}
          message={message}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              onClearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
