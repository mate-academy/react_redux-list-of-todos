import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../Todo/TodoCard';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
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
        {filteredTodos.map(todo => {
          return <TodoCard key={todo.id} todo={todo} />;
        })}
      </tbody>
    </table>
  );
};
