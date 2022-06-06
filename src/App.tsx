import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { getUserIdSelector, todosLoading } from './store';

const App: React.FC = () => {
  const selectedUserId = useSelector(getUserIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const todosFromServer = async () => {
      dispatch(todosLoading(await getTodos()));
    };

    todosFromServer();
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
