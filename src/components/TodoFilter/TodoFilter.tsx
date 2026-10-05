type StatusFilter = 'all' | 'active' | 'completed';

export const TodoFilter = ({
  statusFilter,
  searchQuery,
  onStatusFilterChange,
  onSearchQueryChange,
  onClearSearch,
}: {
  statusFilter: StatusFilter;
  searchQuery: string;
  onStatusFilterChange: (filter: StatusFilter) => void;
  onSearchQueryChange: (query: string) => void;
  onClearSearch: () => void;
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={changeEvent =>
            onStatusFilterChange(changeEvent.target.value as StatusFilter)
          }
          value={statusFilter}
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
        onChange={e => onSearchQueryChange(e.target.value)}
        value={searchQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {searchQuery && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onClearSearch()}
          />
        )}
      </span>
    </p>
  </form>
);
