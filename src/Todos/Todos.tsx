import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TodoList } from '../TodoList/TodoList';
import { getCompleteTodos } from '../Api/Api';

interface Props {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  sortByTitle: () => void;
  sortByUserName: () => void;
  sortByStatus: () => void;
}
export const TodosTemplate: FC<Props> = (props) => {
  const {
    todos,
    setTodos,
    sortByTitle,
    sortByUserName,
    sortByStatus,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    const todosFromServer = await getCompleteTodos();

    setTodos(todosFromServer);
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      {!todos.length && (
        <button type="button" onClick={handleLoad} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      )}
      {!!todos.length && (
        <>
          <button type="button" onClick={sortByTitle}>
            Sort by title
          </button>
          <button type="button" onClick={sortByStatus}>
          Sort by Status
          </button>
          <button type="button" onClick={sortByUserName}>
          Sort by UserName
          </button>
        </>
      )}
      <TodoList todos={todos} />
    </div>
  );
};

const mapStateToProps = (state: Todo[]) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setTodos: (todos: Todo[]) => dispatch({ type: 'SET_TODOS', payload: todos }),
    sortByTitle: () => dispatch({ type: 'SORT_BY_TITLE' }),
    sortByStatus: () => dispatch({ type: 'SORT_BY_STATUS' }),
    sortByUserName: () => dispatch({ type: 'SORT_BY_USERNAME' }),
  };
};

export const Todos = connect(mapStateToProps, mapDispatchToProps)(TodosTemplate);
