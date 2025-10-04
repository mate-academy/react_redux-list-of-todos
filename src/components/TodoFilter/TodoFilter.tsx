import { Status } from '../../types/Status';
import React from 'react';

type Props = {
  filter: Status;
  onFilterChange: (filter: Status) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const newFilter = e.target.value as Status;

              onFilterChange(newFilter);
            }}
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
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
              aria-label="Clear search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
