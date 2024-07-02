/* eslint-disable */
import React, { useMemo } from 'react';
import { TableHead } from '../TableHead';
import { TableBody } from '../TableBody';
import { useAppSelector } from '../../app/hooks';

enum Status {
  completed = 'completed',
  active = 'active',
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const visibleTodos = useMemo(() => {
    let todosProcessed = [...todos];

    switch (status) {
      case Status.completed:
        todosProcessed = todosProcessed.filter(todo => !todo.completed);
        break;
      case Status.active:
        todosProcessed = todosProcessed.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      todosProcessed = todosProcessed.filter(todo =>
        todo.title.toLocaleLowerCase().includes(query.toLocaleUpperCase()),
      );
    }

    return todosProcessed;
  }, [status, query]);
  return (
    <table className="table is-narrow is-fullwidth">
      {!!visibleTodos.length && <TableHead />}
      <TableBody visibleTodos={visibleTodos} />
    </table>
  );
};
