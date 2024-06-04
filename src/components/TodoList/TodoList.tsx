import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { useAppSelector } from '../../app/hooks';
import { filteredTodos as helperFilteredTodos } from '../../utils/filterTodos';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = helperFilteredTodos(todos, status, query);

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

          <th></th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <TodoInfo key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
