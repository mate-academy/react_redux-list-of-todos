import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const handleStatus = (value: string) => {
    switch (value) {
      case Status.ACTIVE:
        return dispatch(filterActions.status(Status.ACTIVE));

      case Status.COMPLETED:
        return dispatch(filterActions.status(Status.COMPLETED));

      case Status.ALL:
      default:
        return dispatch(filterActions.status(Status.ALL));
    }
  };

  const handleQuery = (value: string) => {
    return dispatch(filterActions.query(value));
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
            onChange={event => handleStatus(event.target.value)}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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
          onChange={event => handleQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="input clear button"
                onClick={() => handleQuery('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
