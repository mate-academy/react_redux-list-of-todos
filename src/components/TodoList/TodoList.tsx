/* eslint-disable */
import React, { useMemo } from 'react';
import { Thead } from './components/Thead';
import { TodoItem } from './components/TodoItem';
import { useAppSelector } from '../../hooks';
import { Notification } from './components/Notification';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const { status, query } = filter;

  const filteredTodos = useMemo(() => {
    const filteredByStatus = todos.filter(todo => {
      switch (status) {
        case 'all':
          return todo;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
      }
    });

    const filteredByQuery = filteredByStatus.filter(todo => {
      const { title } = todo;
      const lcTitle = title.toLowerCase();
      const lcQuery = query.toLowerCase();

      if (lcTitle.includes(lcQuery)) {
        return todo;
      }

      return;
    });

    return query.length > 0 ? filteredByQuery : filteredByStatus;
  }, [todos, status, query])

  return (
    <>
      {filteredTodos.length === 0 ? <Notification /> : (
        <table className="table is-narrow is-fullwidth">
          <Thead />

          <tbody>
            {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
          </tbody>
        </table>
      )}
    </>
  );
};
