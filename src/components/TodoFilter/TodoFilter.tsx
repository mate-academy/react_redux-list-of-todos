import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const currentFilters = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const { status, query } = currentFilters;

  const setQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.changeQuery(value));
  };

  const setStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case 'all':
        dispatch(filterActions.changeStatus(Status.ALL));
        break;
      case 'active':
        dispatch(filterActions.changeStatus(Status.ACTIVE));
        break;
      case 'completed':
        dispatch(filterActions.changeStatus(Status.COMPLETED));
        break;
      default:
        break;
    }
  };

  const showClear = (query.length) || status !== Status.ALL;

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
            onChange={setStatus}
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
          onChange={setQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {showClear && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(filterActions.changeQuery(''));
                dispatch(filterActions.changeStatus(Status.ALL));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
