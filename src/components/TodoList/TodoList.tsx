import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';

import TodoCard from '../TodoCard/TodoCard';
import {
  sortBy,
  getSortBy,
  getOrder,
} from '../../store';

const SORT_BY_OPTIONS = {
  title: 'title',
  completed: 'completed',
  userName: 'userName',
};

const ORDER = {
  asc: 'asc',
  desc: 'desc',
};

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
          className="button__inner"
          onClick={() => dispatch(sortBy(SORT_BY_OPTIONS.title))}
        >
          Title
          {activeFilter === SORT_BY_OPTIONS.title && (
            order === ORDER.asc ? ' (asc)' : ' (desc)'
          )}
        </button>
        <button
          type="button"
          className="button__inner"
          onClick={() => dispatch(sortBy(SORT_BY_OPTIONS.completed))}
        >
          Status
          {activeFilter === SORT_BY_OPTIONS.completed && (
            order === ORDER.asc ? ' (asc)' : ' (desc)'
          )}
        </button>
        <button
          type="button"
          className="button__inner"
          onClick={() => dispatch(sortBy(SORT_BY_OPTIONS.userName))}
        >
          User name
          {activeFilter === SORT_BY_OPTIONS.userName && (
            order === ORDER.asc ? ' (asc)' : ' (desc)'
          )}
        </button>
      </div>
      <ul className="app__list">
        {sortedTodos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
