import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/index';
import {
  clearQuery,
  setQuery,
  setStatus,
  FilterStatus,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(s => s.filter);

  const onChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setStatus(e.target.value as FilterStatus));
    },
    [dispatch],
  );

  const onChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuery(e.target.value));
    },
    [dispatch],
  );

  const onClear = useCallback(() => dispatch(clearQuery()), [dispatch]);

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={onChangeStatus}
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
          onChange={onChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
