import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTodos, getUserId } from './store';
import { actions as todosActions, LOAD } from './store/todos';
import { actions as userIdActions, SET, CLEAR } from './store/userId';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';
import './styles/general.scss';

function App() {
  const todos = useSelector(getTodos);
  const selectedUserId = useSelector(getUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosActions[LOAD]())
  }, [dispatch])

  const selectUser = useCallback((userId) => {
    dispatch(userIdActions[SET](userId))
  }, [dispatch]);

  const clearUser = useCallback(() => {
    dispatch(userIdActions[CLEAR]())
  }, [dispatch]);
  
  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUser={selectedUserId}
          selectUser={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} clearUser={clearUser} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
}

export default App;
