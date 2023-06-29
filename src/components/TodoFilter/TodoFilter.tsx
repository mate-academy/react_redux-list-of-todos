import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const setStatus = (value: Status) => (
    dispatch(filterActions.setStatus(value))
  );

  const setQuery = (value: string) => (
    dispatch(filterActions.setQuery(value))
  );

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleButtonClick = () => setQuery('');

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          value={query}
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query.length && (
            <button
              data-cy="clearSearchButton"
              aria-label="delete"
              type="button"
              className="delete"
              onClick={handleButtonClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
