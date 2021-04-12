import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getListOfTodos } from '../../store';

import { TodoItem } from '../TodoItem';
import { TODO } from '../../utils/types';
import './TodoList.scss';

export const TodoList = () => {
  const todos: TODO[] = useSelector(getListOfTodos);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';

  const visibleTodos = useMemo(() => {
    if (!appliedQuery) {
      return todos;
    }

    const titleFromQuery = appliedQuery.toLowerCase();

    return todos.filter(({ title }) => ` ${title || ''}`.toLowerCase().includes(titleFromQuery));
  }, [todos, appliedQuery]);

  const sortedList = useMemo(() => {
    if (!sortBy || sortBy === 'all') {
      return visibleTodos;
    }

    const isSortBy = (sortBy === 'true');

    return visibleTodos.filter((todo) => todo.completed === isSortBy);
  }, [sortBy, visibleTodos]);

  return (
    <>
      <ul>
        {sortedList.map((todo: TODO) => (
          <li
            key={todo.id}
            className="TodoList__item TodoList__item--unchecked"
          >
            <TodoItem
              todo={todo}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
