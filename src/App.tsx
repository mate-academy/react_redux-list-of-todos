import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getTodos, getUsers } from './api';
import TodoList from './components/TodoList/TodoList';

import './App.css';

interface Props {
  todos: TodosWithUser | [];
  setTodos: (receivedTodos: TodosWithUser) => void;
}

const App: FC<Props> = ({ todos, setTodos }) => {
  const [isLoading, setLoading] = useState(false);
  const [isStarted, setStarted] = useState(true);
  const preparedTodos = [...todos];

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
          <TodoList
            todos={preparedTodos}
          />
        )}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (receivedTodos: TodosWithUser) => dispatch({
    type: 'LOAD_FROM_API',
    todos: receivedTodos,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
