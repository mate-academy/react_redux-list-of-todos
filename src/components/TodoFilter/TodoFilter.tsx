import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const { status, query } = filter;

  const setQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.filterQuery(status, value));
  };

  const clearQuery = () => {
    dispatch(filterActions.filterAll(status, ''));
  };

  const setStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case 'all':
        dispatch(filterActions.filterAll(value, query));
        break;
      case 'active':
        dispatch(filterActions.filterActive(value, query));
        break;
      case 'completed':
        dispatch(filterActions.filterCompleted(value, query));
        break;
      default:
        break;
    }
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

        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
