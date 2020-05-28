import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SortPanel } from './SortPanel';
import { getSortType } from '../helpers/selectors';
import { Todo } from './Todo';

export const TodoList = ({ todos }: Todos) => {
  const sortType = useSelector(getSortType);

  const sort = (arr: Todo[], sortBy: string) => {
    switch (sortBy) {
      case 'title':
        return [...arr].sort(
          (a, b) => a.title.localeCompare(b.title),
        );
      case 'completed':
        return [...arr].sort(
          (a, b) => Number(a.completed) - Number(b.completed),
        );
      case 'name':
        return [...arr].sort(
          (a, b) => a.user.name.localeCompare(b.user.name),
        );

      default: return arr;
    }
  };

  const sortedTodos = useMemo(() => sort(todos, sortType), [todos, sortType]);

  return (
    <>
      <SortPanel />
      <ul className="collection">
        {sortedTodos.map((todo) => <Todo {...todo} key={todo.id} />)}
      </ul>
    </>
  );
};
