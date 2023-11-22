import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [statusSelected, setStatusSelected] = useState('all');
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterActions.setQuery(search));
  }, [search]);

  useEffect(() => {
    dispatch(filterActions.setStatus(statusSelected));
  }, [statusSelected]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusSelected}
            onChange={event => setStatusSelected(event.target.value)}
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
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
