/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoTable } from '../TodoTable';

enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const TodoList: React.FC = React.memo(() => {
  const todos = useAppSelector((state) => state.todos);
  const filter = useAppSelector((state) => state.filter);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter.status) {
        case FilterStatus.ALL:
          return todo.title.toLowerCase().includes(filter.query.toLowerCase());
        case FilterStatus.ACTIVE:
          return (
            todo.completed === false
            && todo.title.toLowerCase().includes(filter.query.toLowerCase())
          );
        case FilterStatus.COMPLETED:
          return (
            todo.completed === true
            && todo.title.toLowerCase().includes(filter.query.toLowerCase())
          );

        default:
          return todo;
      }
    });
  }, [todos, filter]);

  return (
    <>
      {filteredTodos.length > 0 ? (
        <TodoTable todos={filteredTodos} />
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
});
