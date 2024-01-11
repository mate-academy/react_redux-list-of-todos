/* eslint-disable max-len */
import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import TodoItem from '../TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = memo(({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  if (!todos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          <th aria-label="status">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          <th aria-label="select buttons" />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={currentTodo?.id === todo.id}
          />
        ))}
      </tbody>
    </table>
  );
});
