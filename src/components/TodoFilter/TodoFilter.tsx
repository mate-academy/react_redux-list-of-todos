import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const statusFromView = event.target.value as Status;

    switch (statusFromView) {
      case 'all':
        return dispatch(filterActions.filterAll(statusFromView, query));

      case 'active':
        return dispatch(filterActions.filterActive(statusFromView, query));

      case 'completed':
        return dispatch(filterActions.filterCompleted(statusFromView, query));

      default:
        return dispatch(filterActions.filterAll(statusFromView, query));
    }
  };

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const queryFromView = event.target.value;

    switch (status) {
      case 'all':
        return dispatch(filterActions.filterAll(Status.ALL, queryFromView));
      case 'active':
        return dispatch(filterActions
          .filterActive(Status.ACTIVE, queryFromView));
      case 'completed':
        return dispatch(filterActions
          .filterCompleted(Status.COMPLETED, queryFromView));
      default:
        return dispatch(filterActions.filterAll(Status.ALL, query));
    }
  };

  const resetQuery = () => {
    return dispatch(filterActions.filterAll(status, ''));
  };

  return (
    <form
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
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
          onChange={handleChangeQuery}
          value={query}
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
              onClick={resetQuery}
            />
          </span>
        )}

      </p>
    </form>
  );
};
