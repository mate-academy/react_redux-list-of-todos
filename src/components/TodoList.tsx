import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TodoItem from './TodoItem';
import { SORT_BY_OPTIONS, ORDER } from '../constants';
import {
  sortBy,
  getSortBy,
  getOrder,
} from '../store';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const order = useSelector(getOrder);
  const activeFilter = useSelector(getSortBy);

  const sortedTodos = useMemo(() => {
    const sortDirection = order === ORDER.asc ? 1 : -1;

    switch (activeFilter) {
      case SORT_BY_OPTIONS.title:
        return [...todos]
          .sort((a, b) => (a.title).localeCompare(b.title) * sortDirection);

      case SORT_BY_OPTIONS.completed:
        return [...todos]
          .sort((a, b) => (Number(b.completed) - Number(a.completed)) * sortDirection);

      case SORT_BY_OPTIONS.userName:
        return [...todos]
          .sort((a, b) => ((a.user.name).localeCompare(b.user.name)) * sortDirection);

      default:
        return todos;
    }
  }, [activeFilter, todos, order]);

  return (
    <div>
      <div className="app__list-filters">
        <button
          type="button"
          onClick={() => dispatch(sortBy(SORT_BY_OPTIONS.title))}
        >
          title
          {activeFilter === SORT_BY_OPTIONS.title && (
            order === ORDER.asc ? ' (asc)' : ' (desc)'
          )}
        </button>
        <button
          type="button"
          onClick={() => dispatch(sortBy(SORT_BY_OPTIONS.completed))}
        >
          status
          {activeFilter === SORT_BY_OPTIONS.completed && (
            order === ORDER.asc ? ' (asc)' : ' (desc)'
          )}
        </button>
        <button
          type="button"
          onClick={() => dispatch(sortBy(SORT_BY_OPTIONS.userName))}
        >
          user name
          {activeFilter === SORT_BY_OPTIONS.userName && (
            order === ORDER.asc ? ' (asc)' : ' (desc)'
          )}
        </button>
      </div>
      <ul className="app__list">
        {sortedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
