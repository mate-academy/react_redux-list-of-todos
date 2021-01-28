import React, { useEffect } from 'react';

import './App.scss';
import { connect, ConnectedProps } from 'react-redux';
import TodoList from './components/TodoList/TodoList';
import CurrentUser from './components/CurrentUser/CurrentUser';

import { fetchTodos } from './api/api';
import { Loader } from './components/Loader';
import {
  getTodosListPending, getTodosListError, getTodosListUserId, getCurrentUserPending,
} from './store';
import { RooTStateT } from './api/interface';

const mapStateToProps = (state: RooTStateT) => ({
  pendingTodos: getTodosListPending(state),
  error: getTodosListError(state),
  userId: getTodosListUserId(state),
  pendingUser: getCurrentUserPending(state),
});

const mapDispatchToProps = {
  getTodos: fetchTodos,
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({
  pendingTodos, error, userId, pendingUser, getTodos,
}) => {
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
