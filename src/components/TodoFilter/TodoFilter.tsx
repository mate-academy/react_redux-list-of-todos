import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status, StatusValues } from '../../types/Status';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const setStatus = ((newStatus: Status) => (
    dispatch(actions.setStatus(newStatus)))
  );
  const setQuery = ((newQuery: string) => (
    dispatch(actions.setQuery(newQuery)))
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="statusSelect"
            value={status}
            onChange={(event => {
              setStatus(event.target.value as StatusValues);
            })}
          >
            <option value={StatusValues.All}>All</option>
            <option value={StatusValues.Active}>Active</option>
            <option value={StatusValues.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="
        control
        is-expanded
        has-icons-left
        has-icons-right
      "
      >
        <input
          data-cy="searchInput"
          type="text"
          name="queryInput"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event => {
            setQuery(event.target.value);
          })}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="delete"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
