import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import {
  ActionTypes,
  getSelectedUserIdSelector,
} from './store/store';

const App: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserIdSelector);

  const dispatch = useDispatch();

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    dispatch({ type: ActionTypes.AddTodos, todos: todosFromServer });
  };

  useEffect(() => {
    getTodosFromServer();
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
