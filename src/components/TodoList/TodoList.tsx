import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>
              {todo.completed && (
                <span className="icon has-text-success">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
