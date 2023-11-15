import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const handleQueryChange = (newQuery: string) => {
    dispatch(actionsFilter.setQuery(newQuery));
  };

  const handleQueryClear = () => {
    dispatch(actionsFilter.setQuery(''));
  };

  const handleStatusChange = (status: Status) => {
    dispatch(actionsFilter.setStatus(status));
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
            onChange={(event) => {
              handleStatusChange(event.target.value as Status);
            }}
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
          onChange={event => handleQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {!!query.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
              onClick={handleQueryClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
