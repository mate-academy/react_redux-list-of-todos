/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const getVisibleTodos = () => {
    let result;

    switch (filter.status) {
      case 'active':
        result = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        result = todos.filter(todo => todo.completed);
        break;

      default:
        result = todos;
    }

    return result.filter(todo => todo.title.toLowerCase().includes(filter.quary.toLowerCase()));
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  );
};
