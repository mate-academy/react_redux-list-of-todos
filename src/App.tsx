import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api/api';
import { actions, selectors } from './store';

const App: React.FC = () => {
  // const todos = useSelector(selectors.loadTodos);
  const selectedUserId = useSelector(selectors.getUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosFromServer = await getTodosFromServer();

        dispatch(actions.loadTodos(todosFromServer));
      } catch {
        dispatch(actions.getError('Can not load todos!'));
      }
    };

    getTodos();
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
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
