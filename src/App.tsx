import React, { FC } from 'react';
import './App.css';

import { connect } from 'react-redux';
import {
  setLoading, setError, getLoading, getError, Storage, setNewTodos, getTodos,
} from './store';

import { loadTodos, loadUsers } from './utils/utils';
import { TodoWithUser } from './utils/types';
import { TodoList } from './components/TodoList';

interface Props {
  isLoading: boolean;
  isError: string;
  todos: TodoWithUser[];
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setNewTodos: (value: TodoWithUser[]) => void;
}

const App: FC<Props> = (props) => {
  const {isLoading, isError, todos, setLoading, setError, setNewTodos} = props;

  const clickHandler = () => {
    setLoading(true);
    Promise.all([
      loadTodos(),
      loadUsers(),
    ])
      .then(([todosFromApi, usersFromApi]) => {
        const preparedTodos = todosFromApi.map(todo => {
          const user = usersFromApi.find(person => todo.userId === person.id);

          return { ...todo, user };
        });

        setNewTodos(preparedTodos);
        setLoading(false);
      })
      .catch(() => {
        setError('Download error, try again.');
        setLoading(false);
      });
  };


  return !todos.length
    ? (
      <>
        <h1>Redux list of todo</h1>
        <button
          type="button"
          onClick={clickHandler}
          disabled={isLoading}
        >
          load data
        </button>
        <p>{isLoading ? 'Loading...' : ''}</p>
        <p>{isError || ''}</p>
      </>
    )
    : <TodoList />
};

const mapDispatchToProps = { setLoading, setError, setNewTodos };
const mapStateToProps = (state: Storage) => ({
  isLoading: getLoading(state),
  isError: getError(state),
  todos: getTodos(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
