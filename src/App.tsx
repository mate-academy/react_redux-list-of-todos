import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { getTodos } from './api/api';
import { actions } from './store/actions';
import { selectors } from './store/index';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';
import './styles/general.scss';

import './App.scss';

const App = () => {
  const selectedUserId = useSelector(selectors.getUsersIdSelector);

  const dispatch = useDispatch();

  const getAllPosts = useCallback(
    async () => {
      const gotTodos = await getTodos();

      dispatch(actions.loadTodosAction(gotTodos));
    }, [],
  );

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
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
    </>
  );
};

export default App;
