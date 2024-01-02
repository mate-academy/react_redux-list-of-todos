import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.filter);

  const handleStatus = (completed: Status) => {
    dispatch(filterActions.completedAction(completed));
  };

  const handleQuery = (text: string) => {
    dispatch(filterActions.queryAction(text));
  };

  const handleClear = () => {
    dispatch(filterActions.queryAction(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={(e) => handleStatus(e.target.value as Status)}
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
          onChange={(e) => handleQuery(e.target.value)}
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => handleClear()}
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
