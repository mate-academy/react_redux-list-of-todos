import React, { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const handleStatusChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(filterActions.setFilter(event.target.value as Status));
    },
    [dispatch],
  );
  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(filterActions.setQuery(event.target.value));
    },
    [dispatch],
  );
  const handleDeleteQuery = useCallback(() => {
    dispatch(filterActions.clearQuery());
  }, [dispatch]);

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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
