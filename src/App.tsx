import React, { useEffect } from 'react';

import './App.scss';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import TodoList from './components/TodoList/TodoList';
import CurrentUser from './components/CurrentUser/CurrentUser';

import { fetchTodos } from './api/api';
import { Loader } from './components/Loader';
import {
  getTodosListPending,
  getTodosListError,
  getCurrentUserPending,
  getCurrentUserId,
} from './store';

const mapDispatchToProps = {
  getTodos: fetchTodos,
};

const connector = connect(
  null,
  mapDispatchToProps,
);

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({
  getTodos,
}) => {
  const pendingTodos = useSelector(getTodosListPending);
  const pendingUser = useSelector(getCurrentUserPending);
  const error = useSelector(getTodosListError);
  const userId = useSelector(getCurrentUserId);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="App">
      <div className="App__sidebar">
        {pendingTodos ? (
          <Loader />
        ) : (
          <TodoList />
        )}
        {error && (
          <p>{error.toString()}</p>
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {pendingUser && userId && (
            <Loader />
          )}
          { userId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default connector(App);
