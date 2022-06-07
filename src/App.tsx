import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api';

import './App.scss';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import { ActionTypes, getSelectedUserIdSelector } from './store';

const App = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(getSelectedUserIdSelector);

  const getTodosFromServer = useCallback((async () => {
    const todoFromServer = await getTodos();

    dispatch({ type: ActionTypes.ADD_TODOS, todos: todoFromServer });
  }), []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
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
