import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as FilterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleChangeQuery = (value: string) => (
    dispatch(FilterActions.setQuery(value)));

  const handleChangeStatus = (value: Status) => (
    dispatch(FilterActions.setStatus(value)));

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
            onChange={e => handleChangeStatus(e.target.value as Status)}
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
          onChange={e => handleChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="deleteQuery"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
