import React, { useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { actions as userActions } from './redux/user';
import { selectors, loadTodos } from './redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(selectors.getUser);
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
        <TodoList
          todos={todos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {currentUserData ? (
            <CurrentUser
              clearUser={clearUser}
              currentUserData={currentUserData}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
