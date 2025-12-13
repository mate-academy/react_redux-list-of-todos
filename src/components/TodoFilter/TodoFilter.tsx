interface Props {
  searchQuery: string;
  onFilterChange: (status: string) => void;
  onSearchChange: (searchText: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onFilterChange(event.target.value)}
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
          value={searchQuery}
          placeholder="Search..."
          onChange={event => onSearchChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
