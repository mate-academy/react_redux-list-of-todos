import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { getTodos } from './api/api';
import { actions } from './store/actions';
import { selectors } from './store/index';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';
// import Start from './components/Start';
// import { Finish } from './components/Finish';

// import { isLoading, getMessage } from './store';

const App = () => {
  const selectedUserId = useSelector(selectors.getUsersIdSelector);
  const errorMessage = useSelector(selectors.loadErrorSelector);

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
    <div className="App">
      <h1>Redux list of todos</h1>
      {errorMessage.length === 0
        ? (
          <>
            <div className="App__sidebar">
              <TodoList />
            </div>

            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser />
                )
                  : 'No user selected'}
              </div>
            </div>
          </>

        ) : (<p className="App__error">{errorMessage}</p>)}
    </div>
  );
};

export default App;
