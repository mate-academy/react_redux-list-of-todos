import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector((state) => state.filter.query);
  const status = useAppSelector((state) => state.filter.status);

  const handleStatus = (value: string) => {
    switch (value) {
      case Status.ACTIVE:
        return dispatch(actionsFilter.status(Status.ACTIVE));
      case Status.COMPLETED:
        return dispatch(actionsFilter.status(Status.COMPLETED));
      default:
        return dispatch(actionsFilter.status(Status.ALL));
    }
  };

  const handleQuery = (value: string) => {
    dispatch(actionsFilter.query(value));
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

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="button"
            />
          </span>
        )}
      </p>
    </form>
  );
};
