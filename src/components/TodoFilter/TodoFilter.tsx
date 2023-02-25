import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleSetQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQueryFilter(event.target.value));
  };

  const handleClearQuery = () => {
    dispatch(filterActions.ClearQuery());
  };

  const handleStatus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Status;

    dispatch(filterActions.setStatusFilter(value));
  }, []);

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
            onChange={handleStatus}
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
          onChange={handleSetQuery}
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
            onClick={handleClearQuery}
          />
        </span>
      </p>
    </form>
  );
};
