import React from 'react';
import { actions as filtersActions } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const changeQuery = (value: string) => {
    dispatch(filtersActions.setQuery(value));
  };

  const changeStatus = (value: Status) => {
    dispatch(filtersActions.setStatus(value));
  };

  const clearQuery = () => {
    changeQuery('');
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
            onChange={(event) => changeStatus(event.target.value as Status)}
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
          onChange={(event) => changeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearQuery}
          />
        </span>
      </p>
    </form>
  );
};
