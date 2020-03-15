import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { TodoList } from '../TodoList/TodoList';
import {
  TodoWithUsers,
  RootState,
  UserType,
  TodoType,
} from '../../utils/interfaces';
import { todosWithUsers, sortTodos } from '../../utils/dataMappers';
import { getTodos, getUsers } from '../../utils/api';
import {
  startLoading as onStartLoading,
  stopLoading as onStopLoading,
  setError as onSetError,
  setIsLoaded as onSetLoaded,
  setTodos as onSetTodos,
  setUsers as onSetUsers,
  setSortField as onSetSortField,
} from '../../store/actionCreators';

interface Props extends Pick<RootState,
'isLoaded' | 'isLoading' | 'error' | 'sortField'> {
  todos: TodoWithUsers[];
  setTodos: (todos: TodoType[]) => void;
  setUsers: (users: UserType[]) => void;
  startLoading: () => void;
  stopLoading: () => void;
  setIsLoaded: () => void;
  setError: (error: string | null) => void;
  setSortField: (field: string) => void;
}


const TodosTemplate: FC<Props> = ({
  isLoaded,
  isLoading,
  error,
  todos,
  sortField,
  setTodos,
  setUsers,
  startLoading,
  stopLoading,
  setIsLoaded,
  setError,
  setSortField,
}) => {
  const loadData = useCallback(() => {
    startLoading();

    Promise.all([getTodos(), getUsers()])
      .then(([loadedTodos, loadedUsers]) => {
        setUsers(loadedUsers);
        setTodos(loadedTodos);
        setIsLoaded();
        setError(null);
      })
      .catch((serverError) => setError(serverError.message))
      .finally(() => stopLoading());
  }, [setError, setIsLoaded, setTodos, setUsers, startLoading, stopLoading]);

  const sortHandler = (field: string) => {
    setSortField(field);
  };

  const sortedTodos = sortTodos(sortField, todos);

  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }

  if (!isLoaded) {
    return (
      <button
        className="start-button"
        type="button"
        onClick={loadData}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Static list of todos</h1>
      <div className="buttons">
        <button
          className="button"
          type="button"
          onClick={() => sortHandler('sortByTitle')}
        >
        Sort by title
        </button>
        <button
          className=" button"
          type="button"
          onClick={() => sortHandler('sortByName')}
        >
          Sort by name
        </button>
        <button
          className="button"
          type="button"
          onClick={() => sortHandler('sortByCompleted')}
        >
          Sort by completed
        </button>
      </div>
      <p className="amount">{`Amount of todos: ${todos.length}`}</p>
      <TodoList todos={sortedTodos} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.users.length
      ? todosWithUsers(state.todos, state.users) : [],
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
    error: state.error,
    sortField: state.sortField,
  };
};

const mapDispatchToProps = {
  setTodos: onSetTodos,
  setUsers: onSetUsers,
  startLoading: onStartLoading,
  stopLoading: onStopLoading,
  setIsLoaded: onSetLoaded,
  setError: onSetError,
  setSortField: onSetSortField,
};

export const Todos = connect(mapStateToProps, mapDispatchToProps)(TodosTemplate);
