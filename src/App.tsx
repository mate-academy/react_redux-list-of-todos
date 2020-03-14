import React, { FC } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { getTodosFromServer } from './api/todosApi';
import { getUsersFromServer } from './api/usersApi';

import {
  getTodos,
  getIsLoading,
  getIsLoaded,
  getSortfield,
} from './store/rootReducer';

import {
  setTodosAction,
  setLoadingAction,
  setLoadedAction,
  setSortFieldAction,
  deleteTodoAction,
} from './store/actionCreators';

import { TodoList } from './components/TodoList';
import { RootState, PreparedTodoType, UserType } from './utils/interfaces';

interface Props {
  todos: PreparedTodoType[];
  setTodos: (value: PreparedTodoType[]) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
  sortField: string;
  setSortField: (value: string) => void;
  deleteTodo: (value: number) => void;
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
  deleteTodo,
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
          <TodoList todos={todos} sortTodos={sortTodos} deleteTodo={deleteTodo} />
        )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: getTodos(state),
  isLoading: getIsLoading(state),
  isLoaded: getIsLoaded(state),
  sortField: getSortfield(state),
});

const mapDispatchToProps = {
  setTodos: setTodosAction,
  setLoading: setLoadingAction,
  setLoaded: setLoadedAction,
  setSortField: setSortFieldAction,
  deleteTodo: deleteTodoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
