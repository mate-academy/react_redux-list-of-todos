import React, { useMemo } from 'react';
import { TodoInfo } from '../TodoInfo';
import { getPreparedTodos } from '../../utils/getPreparedTodos';
import { useAppSelector } from '../../hooks/useAppSelector';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const query = useAppSelector(state => state.filters.query);
  const status = useAppSelector(state => state.filters.status);

  const filteredTodos = useMemo(
    () => getPreparedTodos(todos, { query, status }),
    [todos, query, status],
  );

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
        {filteredTodos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
