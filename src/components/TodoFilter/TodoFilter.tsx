import React, { useState } from 'react';
import { debounce } from '../../utils';
import { useDispatch } from 'react-redux';
import { searchTodo, setFilter } from '../../features/filter';
import { AppDispatch } from '../../app/store';
import { FilterTypes } from '../../types/FilterTypes';

export const TodoFilter = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearchTodo = debounce((value: string) => {
    dispatch(searchTodo(value));
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    debouncedSearchTodo(value);
  };

  const clearSearchQuery = () => {
    setQuery('');
    dispatch(searchTodo(''));
  };

  const handleFilterQuery = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FilterTypes;

    dispatch(setFilter(selectedFilter));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterQuery}>
            <option value={FilterTypes.All}>All</option>
            <option value={FilterTypes.Active}>Active</option>
            <option value={FilterTypes.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
