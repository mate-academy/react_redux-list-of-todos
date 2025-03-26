import React, { useState, useEffect } from 'react';
import { Status } from '../../types/Status';

interface TodoFilterProps {
  onFilterChange: (status: Status, search: string) => void;
  currentStatus: Status;
  currentSearch: string;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  currentStatus,
  currentSearch,
}) => {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [search, setSearch] = useState<string>(currentSearch);

  useEffect(() => {
    setStatus(currentStatus);
    setSearch(currentSearch);
  }, [currentStatus, currentSearch]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Status;
    setStatus(newStatus);
    onFilterChange(newStatus, search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    onFilterChange(status, newSearch);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={handleStatusChange}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={search}
          onChange={handleSearchChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {search.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearch('');
                onFilterChange(status, '');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
