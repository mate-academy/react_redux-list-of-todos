import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  handleFilter: (status: Status, query: string) => void;
  filters: { status: Status, query: string }
  handleClearQuery: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  handleFilter,
  filters,
  handleClearQuery,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">

          <select
            data-cy="statusSelect"
            onChange={(e) => handleFilter(
              e.target.value as Status, filters.query,
            )}
            value={filters.status}
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
          value={filters.query}
          onChange={(e) => handleFilter(
            filters.status, e.target.value,
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleClearQuery(filters.status)}
            />
          </span>
        )}
      </p>
    </form>
  );
};
