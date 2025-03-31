import React from 'react';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onChangeFilter: (filter: 'all' | 'active' | 'completed') => void;
  onQueryChange: (query: string) => void;
  query: string;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  onChangeFilter,
  query,
  onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={e =>
            onChangeFilter(e.target.value as 'all' | 'active' | 'completed')
          }
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
        onChange={e => onQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query !== '' && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
