type Props = {
  status: string;
  query: string;
  handleSetQuery: (value: string) => void;
  handleChangeStatus: (value: string) => void;
  handleClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  handleSetQuery,
  handleClearQuery,
  handleChangeStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(e) => handleChangeStatus(e.target.value)}
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
        name="query"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleSetQuery(e.target.value)}
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
            onClick={handleClearQuery}
          />
        </span>
      )}
    </p>
  </form>
);
