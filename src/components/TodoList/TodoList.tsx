import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { useAppSelector } from '../../app/store';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const filteredTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(lowerCaseQuery);

      switch (currentStatus) {
        case Status.Active:
          return filteredByQuery && !todo.completed;
        case Status.Completed:
          return filteredByQuery && todo.completed;
        default:
          return filteredByQuery;
      }
    });
  }, [query, todos, currentStatus]);

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
        {filteredTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
