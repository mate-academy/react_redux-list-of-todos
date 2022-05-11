import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import {
  isLoading,
  getMessage,
  startLoading,
  finishLoading,
  setTodos,
  getSelectedUserId,
  getHasLoadingError,
  setHasLoadingError,
} from './store';

const App = () => {
  const dispatch = useDispatch();

  const loading = useSelector(isLoading);
  const message = useSelector(getMessage);
  const selectedUserId = useSelector(getSelectedUserId);
  const hasLoadingError = useSelector(getHasLoadingError);

  useEffect(() => {
    dispatch(setHasLoadingError(false));
    dispatch(startLoading());

    getTodos()
      .then(todoList => {
        let action;

        if (!todoList.error) {
          dispatch(setTodos(todoList));
          action = finishLoading('Success!');
        } else {
          dispatch(setHasLoadingError(true));
          action = finishLoading('Error!');
        }

        dispatch(action);
      });
  }, []);

  const sidebarContent = hasLoadingError
    ? (
      <h2>{message}</h2>
    )
    : (
      <div className="App__sidebar">
        <h2>{message}</h2>

        <TodoList />
      </div>
    );

  return (
    <div className="App">

      {loading
        ? 'Loading'
        : sidebarContent}

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
