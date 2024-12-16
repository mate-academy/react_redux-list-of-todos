import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { TodoStatusFilter } from '../../constants/StatusFilter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  const onQueryClear = () => {
    dispatch(filterActions.clearQuery());
  };

  const onStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as TodoStatusFilter));
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
            onChange={onStatusChange}
          >
            {Object.keys(TodoStatusFilter).map((statusFilter, index) => (
              <option
                key={`${statusFilter}-${index}`}
                value={statusFilter.toLowerCase()}
              >
                {statusFilter}
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
          onChange={onQueryChange}
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
              onClick={onQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
