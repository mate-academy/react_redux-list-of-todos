import React, { FC } from 'react';
import { TodoList } from '../TodoList/TodoList';

interface Props {
  todos: TodoWithUser[];
  isLoading: boolean;
  loadTodos: () => void;
}

export const AppTemplate: FC<Props> = (props) => {
  const {
    isLoading,
    todos,
    loadTodos,
  } = props;

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {todos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={loadTodos}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <TodoList />
        )}
    </>
  );
};
