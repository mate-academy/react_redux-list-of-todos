import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LOAD_FROM_API } from './store';
import { getTodos, getUsers } from './api';
import TodoList from './components/TodoList/TodoList';

import './App.css';

interface Props {
  setTodos: (receivedTodos: TodosWithUser) => void;
}

const App: FC<Props> = ({ setTodos }) => {
  const [isLoading, setLoading] = useState(false);
  const [isStarted, setStarted] = useState(true);

  const loadData = () => {
    setLoading(true);

    Promise.all([getTodos(), getUsers()])
      .then(([todosFromApi, usersFromApi]) => {
        const receivedTodos = todosFromApi.map(todo => ({
          ...todo,
          user: usersFromApi.find(person => todo.userId === person.id) as User,
        }));

        setTodos(receivedTodos);
        setLoading(false);
        setStarted(false);
      });
  };

  return (
    <>
      {isStarted
        ? (
          <button
            type="button"
            className="button button-load"
            disabled={isLoading}
            onClick={loadData}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <TodoList />
        )}
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (receivedTodos: TodosWithUser) => dispatch({
    type: LOAD_FROM_API,
    todos: receivedTodos,
  }),
});

export default connect(null, mapDispatchToProps)(App);
