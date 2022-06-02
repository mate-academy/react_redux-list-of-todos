import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { actions, selectors } from './store';

import './App.scss';

import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(selectors.getUserId);

  const getAllPosts = useCallback(async () => {
    const gotTodos = await getTodos();

    dispatch(actions.loading__todos(gotTodos));
  }, []);

  useEffect(() => {
    getAllPosts();
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
          )
            : (
              'No user selected'
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
