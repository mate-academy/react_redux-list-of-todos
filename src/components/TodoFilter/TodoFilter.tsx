type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  status: 'all' | 'active' | 'completed';
  onStatusChange: (value: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter = ({
  searchValue,
  onSearchChange,
  onClear,
  status,
  onStatusChange,
}: Props) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e =>
              onStatusChange(e.target.value as 'all' | 'active' | 'completed')
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
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
