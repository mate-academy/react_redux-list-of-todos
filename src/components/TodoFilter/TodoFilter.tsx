interface Props {
  status: string;
  search: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  status,
  search,
  onStatusChange,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value)}
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
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
