import React from 'react';
import { Filters } from '../../types/Filters';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setFilter, setQuery } from '../../features/filter';
import { FILTERS } from '../../constants/filters';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { query, status: selectedFilter } = useAppSelector(
    state => state.filter,
  );

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as Filters));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value.trimStart()));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={onFilterChange}
          >
            {FILTERS.map(filter => (
              <option value={filter.toLowerCase()} key={filter}>
                {filter}
              </option>
            ))}
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
          onChange={onInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
              aria-label="Clear search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
