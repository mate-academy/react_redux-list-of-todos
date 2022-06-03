import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './App.scss';
import { getTodos } from './api';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';

import { selectors, actions } from './store';

const App = () => {
  const selectedUserId = useSelector(selectors.getUserId);
  const errorMessage = useSelector(selectors.getError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function response() {
      try {
        const todosFromServer = await getTodos();

        dispatch(actions.loadingTodos(todosFromServer));
      } catch {
        dispatch(actions.getError('Can not load todos'));
      }
    }

    response();
  }, []);

  return (
    <div>
      <h1>Redux list of todos</h1>
      {errorMessage.length === 0 ? (
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
      ) : (<p className="App__error">{errorMessage}</p>)}
    </div>
  );
};

export default App;
