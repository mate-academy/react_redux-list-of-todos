import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status: filter, query } = useAppSelector(state => state.filter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.changeFilter(event.target.value as Status));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.changeQuery(event.target.value));
  };

  const clearSearch = () => {
    dispatch(filterSlice.actions.changeQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={event => handleSelect(event)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleChange}
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={clearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
