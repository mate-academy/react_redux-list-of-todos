/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';

interface Props {
  todos: Todo[];
  loading: boolean;
}

export const TodoList: React.FC<Props> = ({ todos, loading }) => {
  return (
    <>
      {!todos.length && !loading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!todos.length && !loading && (
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
            {todos.map((todo) => (
              <TodoCard todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
