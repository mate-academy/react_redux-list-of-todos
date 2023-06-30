type Props = {
  query: string,
  status: string,
  todoStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  setQuery: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  todoStatus,
  setQuery,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={todoStatus}
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
          onChange={handleOnChange}
          value={query}
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
              onClick={handleClear}
            />
          </span>
        )}

      </p>
    </form>
  );
};
