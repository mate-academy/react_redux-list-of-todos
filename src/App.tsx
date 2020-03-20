/* import React, { useState, FC } from 'react';
import './App.css';
import { getTodos } from './api/utils/getTodos';
import { getUsers } from './api/utils/getUsers';
import { TodoList } from './components/TodoList/TodoList';

export const App: FC = () => {
  const [isLoading, setIsLoadindg] = useState(false);
  const [preparedTodos, setPreparedTodos] = useState<PreparedTodo[]>([]);
  const [typeOfSort, setTypeOfSort] = useState('');

  const handleLoadButton = async () => {
    setIsLoadindg(true);
    const todos = await getTodos();
    const users = await getUsers();

    const addUserForTodos = () => todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) as User,
    }));

    setPreparedTodos(addUserForTodos());
  };

  const handleTypeOfSort = () => {
    switch (typeOfSort) {
      case 'title':
        return [...preparedTodos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...preparedTodos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...preparedTodos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return preparedTodos;
    }
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {preparedTodos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLoadButton}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <>
            <button
              className="button"
              type="button"
              onClick={() => setTypeOfSort('title')}
            >
              sort by title
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setTypeOfSort('completed')}
            >
              sort by status
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setTypeOfSort('user')}
            >
              by user name
            </button>
            <TodoList todos={handleTypeOfSort()} />
          </>
        )}
    </>
  );
};
 */

import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { todosPreparer } from './api/utils/todosPrepader';
import {
  setIsLoadind,
  setTodos,
  deleteTodo,
  setSortType,
} from './store/store';
import { TodoList } from './components/TodoList/TodoList';

interface Props extends RootState {
  setIsLoadind: (value: boolean) => void;
  setTodos: (todos: PreparedTodo[]) => void;
  deleteTodo: (id: number) => void;
  setSortType: (sort: string) => void;
}

export const AppTemplate: FC<Props> = (props) => {
  const {
    isLoading,
    typeOfSort,
    todos,
  } = props;

  const handleLoadButton = async () => {
    setIsLoadind(true);
    const todosPrepared = await todosPreparer();

    console.log(todosPrepared);

    return todosPrepared;
  };

  /* const handleTypeOfSort = () => {
    switch (typeOfSort) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...todos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...todos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return todos;
    }
  }; */

  const todosSorted = useMemo(() => {
    switch (typeOfSort) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...todos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...todos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return todos;
    }
  }, [todos, typeOfSort]);

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {todos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLoadButton}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <>
            <button
              className="button"
              type="button"
              onClick={() => setSortType('title')}
            >
              sort by title
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setSortType('completed')}
            >
              sort by status
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setSortType('user')}
            >
              by user name
            </button>
            <TodoList todos={todosSorted} />
          </>
        )}
    </>
  );
};

const mapState = (state: RootState) => ({
  isLoading: state.isLoading,
  todos: state.todos,
  typeOfSort: state.typeOfSort,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setIsLoadind: (val: boolean) => dispatch(setIsLoadind(val)),
  setTodos: (todos: PreparedTodo[]) => dispatch(setTodos(todos)),
  deleteTodo: (id: number) => dispatch(deleteTodo(id)),
  setSortType: (sort: string) => dispatch(setSortType(sort)),
});

export const App = connect(
  mapState,
  mapDispatch,
)(AppTemplate);
