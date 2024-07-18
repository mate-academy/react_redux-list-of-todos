/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';
import { TodosSortField } from '../../utils/const';

interface Props {
  isLoading: boolean;
}

export const TodoList: React.FC<Props> = ({ isLoading }) => {
  const todos = useAppSelector(state => state.todos.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    let visibleTodos = [...todos];

    switch (status) {
      case TodosSortField.ACTIVE:
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;

      case TodosSortField.COMPLETED:
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (!!query.length) {
      visibleTodos = visibleTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    return visibleTodos;
  }, [query, status]);

  return (
    <>
      {!filteredTodos.length && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!filteredTodos.length && (
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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
