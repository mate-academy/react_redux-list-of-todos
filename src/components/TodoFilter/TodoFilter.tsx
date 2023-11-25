import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

type Props = {
};

export const TodoFilter: React.FC<Props> = () => {
  const filter = useAppSelector(state => state.filter);
  const { query, status } = filter;
  const dispatch = useAppDispatch();

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as Status;

    dispatch(filterActions.setStatus(newStatus));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    dispatch(filterActions.setQuery(newQuery));
  }

  function handleCloseSearch() {
    dispatch(filterActions.resetQuery());
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
