import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { setTodos as setTodosStore } from './store';
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

const mapDispatchToProps = {
  setTodos: setTodosStore,
};

export default connect(null, mapDispatchToProps)(App);
