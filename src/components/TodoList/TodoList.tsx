import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem.tsx';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
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
        {todos.map((todo) => {
          return (
            <TodoItem key={todo.id} todo={todo} />
          );
        })}
      </tbody>
    </table>
  );
};
