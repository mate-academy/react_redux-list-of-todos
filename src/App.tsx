import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api/api';
import './App.scss';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import { actions, selectors } from './store';
import './styles/general.scss';
// import { Todo } from './types/TodoType';

const App = () => {
  const selectedUserId = useSelector(selectors.getUserId);
  const messageError = useSelector(selectors.getMessageError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function response() {
      try {
        const todosFromServer = await getTodos();

        dispatch(actions.getTodos(todosFromServer));
      } catch {
        dispatch(actions.getError('Can not load todos'));
      }
    }

    response();
  }, []);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {messageError.length === 0 ? (
        <>
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
        </>
      ) : (<p className="App__error">{messageError}</p>)}
    </div>
  );
};

export default App;
