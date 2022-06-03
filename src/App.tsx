import React, { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { ACTIONS } from './store/actions';
import { getTodoSelector, getUserIdSelector } from './store/selectors';

const App: React.FC = () => {
  const { addTodos } = ACTIONS;
  const [errorText, setErrorText] = useState('');

  const todos = useSelector(getTodoSelector);
  const selectedUserId = useSelector(getUserIdSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const dataFromServer = await getTodos();

        dispatch(addTodos(dataFromServer));
      } catch (error) {
        setErrorText('Can\'t download data from server!');
      }
    };

    getDataFromServer();
  }, [dispatch]);

  if (errorText) {
    return (
      <div>
        {errorText}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App__sidebar">

        {todos ? (
          <TodoList />
        ) : (
          <p>loading...</p>
        )}
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
