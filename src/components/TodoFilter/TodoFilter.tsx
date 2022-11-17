import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state.filter.status);
  const query = useAppSelector((state) => state.filter.query);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Status.ACTIVE:
        return dispatch(filterActions.status(Status.ACTIVE));
      case Status.COMPLETED:
        return dispatch(filterActions.status(Status.COMPLETED));
      case Status.ALL:
        return dispatch(filterActions.status(Status.ALL));
      default:
        return dispatch(filterActions.status(Status.ALL));
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return dispatch(filterActions.query(event.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.query(''))}
              aria-label="Clear search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
