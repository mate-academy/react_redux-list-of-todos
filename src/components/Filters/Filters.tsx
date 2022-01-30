import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  filterTodosByActions,
  onlyActiveTodosActions,
  onlyCompletedTodosActions,
  showAllTodosActions,
} from '../../store/todosReducer';

export const Filters:React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(filterTodosByActions(query));
  }, [query]);

  return (
    <div className="todos__nav">
      <input
        type="text"
        className="search__todo"
        placeholder="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="todos__filter">
        Show:
        <button
          type="button"
          className="filter-btn"
          onClick={() => {
            dispatch(showAllTodosActions());
            setQuery('');
          }}
        >
          All
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => {
            dispatch(onlyActiveTodosActions());
            setQuery('');
          }}
        >
          Active
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => {
            dispatch(onlyCompletedTodosActions());
            setQuery('');
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
