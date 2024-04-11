import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    switch (status) {
      case 'all':
        return dispatch(filterActions.setStatus(Status.All));
      case 'active':
        return dispatch(filterActions.setStatus(Status.Active));
      case 'completed':
        return dispatch(filterActions.setStatus(Status.Completed));
      default:
        return 'error';
    }
  };

  const handleChaneQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    return dispatch(filterActions.setQuery(query.toLowerCase()));
  };

  const handleReset = () => {
    dispatch(filterActions.setQuery(''));
    dispatch(filterActions.setStatus(Status.All));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={filter.status}
            data-cy="statusSelect"
            onChange={handleChangeSelect}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={filter.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChaneQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
