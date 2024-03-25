import React, { useEffect, useState } from 'react';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';
import { useAppDispatch } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [filterValue, setFilterValue] = useState<Status>('all');

  const dispatch = useAppDispatch();

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;

    setFilterValue(value);
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    dispatch(filterActions.applyFilter(filterValue, query));
  }, [query, filterValue]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeStatus}
            value={filterValue}
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
          onChange={handleChangeQuery}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
