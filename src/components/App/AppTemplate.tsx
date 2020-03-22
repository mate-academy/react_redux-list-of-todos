import React, { FC } from 'react';
import { todosPreparer } from '../../api/utils/todosPrepader';
import { TodoList } from '../TodoList/TodoList';

interface Props {
  todos: PreparedTodo[];
  isLoading: boolean;
  setIsLoadind: (value: boolean) => void;
  setTodos: (todos: PreparedTodo[]) => void;
}

export const AppTemplate: FC<Props> = (props) => {
  const {
    isLoading,
    todos,
    // eslint-disable-next-line no-shadow
    setIsLoadind,
    // eslint-disable-next-line no-shadow
    setTodos,
  } = props;

  const handleLoadButton = async () => {
    setIsLoadind(true);
    const todosPrepared = await todosPreparer();

    setTodos(todosPrepared);

    return todosPrepared;
  };

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
          <TodoList />
        )}
    </>
  );
};
