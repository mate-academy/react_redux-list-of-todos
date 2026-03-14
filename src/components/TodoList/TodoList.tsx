/* eslint-disable */
import React, { useMemo } from 'react';
import { Todo as TodoType } from '../../types/Todo';
import { Todo } from '../Todo';
import { Statuses } from '../../types/Statuses';
import { useAppSelector } from '../../hooks';

interface Props {
  todos: TodoType[];
  handleTodo: (todo: TodoType) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleTodo,
  selectedTodoId,
}) => {
  const { query, status } = useAppSelector(state => ({
    query: state.filter.query,
    status: state.filter.status,
  }));

  const statusFilters: Record<Statuses, (todo: TodoType) => boolean> = {
    [Statuses.COMPLETED]: todo => todo.completed,
    [Statuses.ACTIVE]: todo => !todo.completed,
    [Statuses.ALL]: todo => !!todo,
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo => {
        const matchesStatus = statusFilters[status](todo);
        const matchesQuery = todo.title
          .toLowerCase()
          .includes(query.toLowerCase());

        return matchesStatus && matchesQuery;
      }),
    [todos, query, status],
  );

  return (
    <>
      {filteredTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map(todo => (
              <Todo
                handleTodo={handleTodo}
                isSelected={todo.id === selectedTodoId}
                key={todo.id + todo.title}
                todo={todo}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
