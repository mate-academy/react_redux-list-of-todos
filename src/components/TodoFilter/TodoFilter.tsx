import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector(state => state.filter);
  const { status, query } = currentFilters;

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case Status.ALL:
        dispatch(filterActions.filterAll(value, query));
        break;
      case Status.ACTIVE:
        dispatch(filterActions.filterActive(value, query));
        break;
      case Status.COMPLETED:
        dispatch(filterActions.filterCompleted(value, query));
        break;
      default:
        dispatch(filterActions.filterAll(Status.ALL, query));
    }
  };

  const setSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.filterAll(status, value));
  };

  const setClearQueryHandler = () => {
    dispatch(filterActions.filterAll(status, ''));
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
            onChange={changeStatus}
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
          onChange={setSearchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={setClearQueryHandler}
              aria-label="Clear search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
