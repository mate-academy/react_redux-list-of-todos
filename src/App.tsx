import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { loadTodos, selectors } from './store';

import { actions as userActions } from './store/users';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectors.getUser);
  const todos = useSelector(selectors.getTodos);

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const clearUser = useCallback(() => {
    dispatch(userActions.setUser(null));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {userData ? (
            <CurrentUser clearUser={clearUser} userData={userData} />
          ) : (
            <h3>No selected user</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
