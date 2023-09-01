import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions } from '../../features/filter';

import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(event.target.value as Status));
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const removeQuery = () => {
    dispatch(actions.clearQuery());
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
            onChange={handleFilterStatus}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear"
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
