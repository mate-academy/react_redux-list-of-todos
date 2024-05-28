import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { getFilteredTodos } from '../../helpers/getFilteredTodo';

import { useAppSelector } from '../../hooks/hooks';

export const TodoList: React.FC = () => {
  const allTodos = useAppSelector(state => state.todos);

  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(allTodos, { query, status });

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
        {filteredTodos?.map(todo => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
      </tbody>
    </table>
  );
};
