import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status, filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const setStatus = (value: string) =>
    dispatch(filterSlice.actions.setStatus(value));
  const setQuery = (value: string) =>
    dispatch(filterSlice.actions.setQuery(value));
  const clearQuery = () => dispatch(filterSlice.actions.clearQuery(null));
  const { query } = useAppSelector(state => state.filter);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target.value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
            {Object.entries(Status).map(([status, value]) => (
              <option value={value} key={status}>
                {status}
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
          onChange={handleQueryChange}
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
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
