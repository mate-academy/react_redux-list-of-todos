import React from 'react';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';

const filters: Status[] = ['all', 'active', 'completed'];

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.selectStatus(event.target.value as Status));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      filterSlice.actions.addSearchQuery(event.target.value.trimStart()),
    );
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={onFilterChange}
          >
            {filters.map(filter => (
              <option value={filter} key={filter}>
                {filter[0].toUpperCase() + filter.slice(1)}
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
              onClick={() => dispatch(filterSlice.actions.addSearchQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
