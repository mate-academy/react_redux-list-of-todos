import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  filter: Status;
  query: string;
  onFilterChange: (filter: Status) => void;
  onQueryChange: (value: string) => void;
  onDeleteQuery: () => void;
};
export const TodoFilter: React.FC<Props> = ({
  filter,
  query,
  onFilterChange,
  onQueryChange,
  onDeleteQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={e => onFilterChange(e.target.value as Status)}
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

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onDeleteQuery}
          />
        </span>
      )}
    </p>
  </form>
);
