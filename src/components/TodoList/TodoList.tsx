/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  currentTodo,
}) => {
  return (
    todos.length ? (
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
          <th aria-label="select todo"> </th>
        </tr>
      </thead>

      <tbody>
      {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onSelectTodo={onSelectTodo}
              currentTodo={currentTodo}
            />
          ))}
        </tbody>
      </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
    );
  };
