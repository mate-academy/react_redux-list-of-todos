import React from 'react';

interface Props {
  filter: 'all' | 'active' | 'completed';
  onChangeFilter: (value: 'all' | 'active' | 'completed') => void;
  query: string;
  onChangeQuery: (value: string) => void;
  onClearQuery: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  onChangeFilter,
  query,
  onChangeQuery,
  onClearQuery,
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
        onChange={e => onChangeQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
