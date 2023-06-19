import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { TodoRow } from '../TodoRow';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const handlerSelectTodo = (todoId: number) => {
    const todo = todos.find(({ id }) => id === todoId);

    if (todo) {
      dispatch(currentTodoActions.setTodo(todo));
    }
  };

  const hasTodos = useMemo(() => {
    return todos.length > 0;
  }, [todos]);

  return (
    <>
      {!hasTodos && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {hasTodos && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {todos.map(({ id, completed, title }) => (
              <TodoRow
                key={id}
                id={id}
                completed={completed}
                title={title}
                isSelectedTodo={selectedTodo?.id === id}
                onSelect={handlerSelectTodo}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
