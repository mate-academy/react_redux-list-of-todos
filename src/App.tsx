import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

import { selectors, actions } from './store';

import './App.scss';
import './styles/general.scss';

const App = () => {
  const todos = useSelector(selectors.getTodos);
  const selectedUserId = useSelector(selectors.getUserId);
  const selectedUser = useSelector(selectors.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadTodos());
  }, [dispatch]);

  const selectUser = useCallback((userId: number) => {
    dispatch(actions.loadUser(userId));
  }, [dispatch]);

  const clearUser = useCallback(() => {
    dispatch(actions.clearUser());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          onSelect={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUser ? (
            <CurrentUser
              user={selectedUser}
              onClear={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
