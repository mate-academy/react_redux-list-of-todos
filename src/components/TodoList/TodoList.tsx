/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/store';
import { CurrentTodo } from '../Todo/CurrentTodo';
import { filterSelector } from '../../features/filter';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const filter = useAppSelector(filterSelector);

  if (!todos.length && !!filter.query) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
      {!!todos.length && (
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
            {todos.map(todo => (
              <CurrentTodo todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
