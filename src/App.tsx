import React, { FC } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { getTodosFromServer } from './api/todosApi';
import { getUsersFromServer } from './api/usersApi';

import {
  setTodosAC, setLoadingAC, setLoadedAC, setSortFieldAC,
  getTodos, getIsLoading, getIsLoaded, getSortfield,
} from './store';

import { TodoList } from './components/TodoList';
import { StoreType, PreparedTodoType, UserType } from './utils/interfaces';

interface Props {
  todos: PreparedTodoType[];
  setTodos: (value: PreparedTodoType[]) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
  sortField: string;
  setSortField: (value: string) => void;
}

const App: FC<Props> = ({
  todos,
  setTodos,
  isLoading,
  setLoading,
  isLoaded,
  setLoaded,
  sortField,
  setSortField,
}) => {
  const loadTodos = async () => {
    setLoading(true);

    const [loadedTodos, loadedUsers] = await Promise.all([
      getTodosFromServer(),
      getUsersFromServer(),
    ]);

    const preparedTodos = [...loadedTodos]
      .map((todo) => {
        const user = loadedUsers.find(person => person.id === todo.userId) as UserType;

        return {
          ...todo,
          user,
        };
      });

    setTodos(preparedTodos);
    setLoaded(true);
    setLoading(false);
  };

  const sortTodos = (sortBy: string) => {
    if (sortBy === sortField) {
      setTodos([...todos].reverse());
    } else {
      switch (sortBy) {
        case 'id': setTodos([...todos]
          .sort((a, b) => b.id - a.id));
          break;
        case 'completed': setTodos([...todos]
          .sort(a => (a.completed ? -1 : 1)));
          break;
        case 'username': setTodos([...todos]
          .sort((a, b) => (b.user.name.localeCompare(a.user.name))));
          break;
        default: setTodos([...todos]
          .sort((a, b) => b.title.localeCompare(a.title)));
      }

      setSortField(sortBy);
    }
  };

  return (
    <div className="App">
      {!isLoaded
        ? (
          <button
            type="button"
            className="button"
            disabled={isLoading}
            onClick={loadTodos}
          >
            {isLoading ? (<>Loading...</>) : (<>Load Todos</>)}
          </button>
        )
        : (
          <TodoList sortTodos={sortTodos} />
        )}
    </div>
  );
};

const mapStateToProps = (state: StoreType) => ({
  todos: getTodos(state),
  isLoading: getIsLoading(state),
  isLoaded: getIsLoaded(state),
  sortField: getSortfield(state),
});

const mapDispatchToProps = {
  setTodos: setTodosAC,
  setLoading: setLoadingAC,
  setLoaded: setLoadedAC,
  setSortField: setSortFieldAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
