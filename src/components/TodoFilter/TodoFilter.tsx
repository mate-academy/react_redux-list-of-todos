import React from 'react';
import { useAppSelector } from '../../app/hooks/hooks';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.setQuery(e.target.value));
  };

  const handleClear = () => dispatch(filterSlice.actions.setQuery(''));

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.setStatus(e.target.value as Status));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
