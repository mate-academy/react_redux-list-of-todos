interface Props {
  filter: string;
  inputValue: string;
  onFilter: (filter: string) => void;
  onInputValue: (inputValue: string) => void;
  onAppliedInputValue: (appliedInputValue: string) => void;
}

export const TodoFilter = ({
  filter,
  inputValue,
  onFilter,
  onInputValue,
  onAppliedInputValue,
}: Props) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => onFilter(event.target.value)}
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
          value={inputValue}
          onChange={({ target }) => {
            onInputValue(target.value);
            onAppliedInputValue(target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onInputValue('');
                onAppliedInputValue('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
