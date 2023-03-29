import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
// import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.filter);

  const setFilterQuery = (newQuery: string) => (
    dispatch(filterActions.setFilterQuery(newQuery))
  );

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setFilterQuery(event.target.value);
  };

  const handleQueryReset = () => {
    setQuery('');
    dispatch(filterActions.setFilterQuery(''));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case 'all':
        dispatch(filterActions.setFilterStatus('all'));
        break;

      case 'active':
        dispatch(filterActions.setFilterStatus('active'));
        break;

      case 'completed':
        dispatch(filterActions.setFilterStatus('completed'));
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        { query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
