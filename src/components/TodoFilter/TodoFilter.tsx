/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const [status, setStatus] = useState(filter.status);
  const [query, setQuery] = useState(filter.query);

  useEffect(() => {
    dispatch(filterActions.setQuery(query));
  }, [query, dispatch]);

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    setStatus(newStatus);
    dispatch(filterActions.setStatus(newStatus));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={handleStatusChange}>
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
          value={filter.query}
          placeholder="Search..."
          onChange={handleSearchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
