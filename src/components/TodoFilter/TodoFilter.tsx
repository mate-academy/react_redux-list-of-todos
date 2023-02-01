import React from 'react';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleStatusChange = (newStatus: Status) => {
    dispatch(filterActions.setStatus(newStatus));
  };

  const handleQueryChange = (newQuery: string) => {
    dispatch(filterActions.setQuery(newQuery));
  };

  const clearInput = () => {
    dispatch(filterActions.setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={(e) => (
              handleStatusChange(e.currentTarget.value as Status))}
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
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(e) => handleQueryChange(e.currentTarget.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => clearInput()}
          />
        </span>
      </p>
    </form>
  );
};
