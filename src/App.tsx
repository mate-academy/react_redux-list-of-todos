import React, { FC } from 'react';
import './App.css';

import { connect } from 'react-redux';
import {
  setLoad, setError, getLoading, getError, Storage, setNewTodos, getTodos,
} from './store';

import { loadTodos, loadUsers } from './utils/utils';
import { TodoWithUser } from './utils/types';
import { TodoList } from './components/TodoList';

interface Props {
  isLoad: boolean;
  isError: string;
  todos: TodoWithUser[];
  setLoad: (value: boolean) => void;
  setError: (value: string) => void;
  setNewTodos: (value: TodoWithUser[]) => void;
}

const App: FC<Props> = (props) => {
  const clickHandler = () => {
    props.setLoad(true);
    Promise.all([
      loadTodos(),
      loadUsers(),
    ])
      .then(([todosFromApi, usersFromApi]) => {
        const preparedTodos = todosFromApi.map(todo => {
          const user = usersFromApi.find(person => todo.userId === person.id);

          return { ...todo, user };
        });

        props.setNewTodos(preparedTodos);
        props.setLoad(false);
      })
      .catch(() => {
        props.setError('Download error, try again.');
        props.setLoad(false);
      });
  };

  if (!props.todos.length) {
    return (
      <>
        <h1>Redux list of todo</h1>
        <button
          type="button"
          onClick={clickHandler}
          disabled={props.isLoad}
        >
          load data
        </button>
        <p>{props.isLoad ? 'Loading...' : ''}</p>
        <p>{props.isError || ''}</p>
      </>
    );
  }

  return (
    <TodoList />
  );
};

const getMethod = { setLoad, setError, setNewTodos };
const getData = (state: Storage) => ({
  isLoad: getLoading(state),
  isError: getError(state),
  todos: getTodos(state),
});


export default connect(getData, getMethod)(App);
