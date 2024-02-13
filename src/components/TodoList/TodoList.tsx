import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  ),
);
