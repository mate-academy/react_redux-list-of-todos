type Props = {
  query: string;
  onChangeQuery: (q: string) => void;
  status: 'all' | 'completed' | 'active';
  onChangeStatus: (s: 'all' | 'completed' | 'active') => void;
  onClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  status,
  onChangeStatus,
  onClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={event =>
              onChangeStatus(
                event.target.value as 'all' | 'completed' | 'active',
              )
            }
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => onChangeQuery(event.target.value)}
          value={query}
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
              onClick={onClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
