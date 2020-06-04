import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TodoCard } from './TodoCard';

import { getTodos, getSortType, getReverseStatus } from '../store';
import { Button } from './Buttons';

const SORT_BY_OPTIONS = {
  title: 'title',
  completed: 'completed',
  userName: 'userName',
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = () => {
  const todos: Todo[] = useSelector(getTodos);
  const sortType = useSelector(getSortType);
  const isReverse = useSelector(getReverseStatus);

  const sortedTodos = useMemo(() => {
    const reverse = Number(isReverse) ? -1 : 1;

    switch (sortType) {
      case SORT_BY_OPTIONS.title:
        return [...todos]
          .sort((a, b) => (a.title).localeCompare(b.title) * reverse);

      case SORT_BY_OPTIONS.completed:
        return [...todos]
          .sort((a, b) => (Number(b.completed) - Number(a.completed)) * reverse);

      case SORT_BY_OPTIONS.userName:
        return [...todos]
          .sort((a, b) => ((a.user.name).localeCompare(b.user.name)) * reverse);

      default:
        return todos;
    }
  }, [sortType, todos, isReverse]);

  return (
    <>
      <Button />
      <ul className="todo-list">
        {sortedTodos.map(todo => (
          <li key={todo.id} className="todo-list__item">
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};
