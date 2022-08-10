/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  selectEl: string,
  selectedTodos: (event: { target: { value: string }; }) => Promise<void>,
  query: string,
  resetQuery: () => void,
  filter: (event: { target: { value: string }; }) => Promise<void>,
};

export const TodoFilter: React.FC<Props> = ({
  selectEl,
  selectedTodos,
  query,
  resetQuery,
  filter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectEl}
            onChange={selectedTodos}
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
          name="query"
          value={query}
          onChange={filter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
