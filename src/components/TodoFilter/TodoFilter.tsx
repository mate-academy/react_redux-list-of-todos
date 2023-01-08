type Props = {
  status: string,
  input: string,
  setInput: (input: string) => void | string,
  setStatus: (status: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  status,
  input,
  setInput,
  setStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
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
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {input && (
          <button
            data-cy="clearSearchButton"
            aria-label="button"
            type="button"
            className="delete"
            onClick={() => setInput('')}
          />
        )}
      </span>
    </p>
  </form>
);
