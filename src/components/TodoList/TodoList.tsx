/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';
import { FilterStatus } from '../../types/enums/FilterStatus';

export const TodoList: React.FC = () => {
  const { todos, filter } = useAppSelector(state => state);

  const filteredTodos = todos
    .filter(todo => {
      switch (filter.status) {
        case FilterStatus.COMPLETED:
          return todo.completed;

        case FilterStatus.ACTIVE:
          return !todo.completed;

        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()));

  return (
    <>
      {
        todos.length
          ? (
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
                {filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
              </tbody>
            </table>
          ) : (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )
      }
    </>
  );
};
