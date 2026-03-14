import classNames from 'classnames';

interface TodoFilterProp {
  filter: string;
  query: string;
  onFilterChange?: (newFilter: string) => void;
  onQueryChange: (newQuery: string) => void;
  onClearQuery: () => void;
}

export const TodoFilter: React.FC<TodoFilterProp> = ({
  filter,
  query,
  onFilterChange,
  onQueryChange,
  onClearQuery,
}) => (
  <form className="field has-addons" data-cy="todoFilter">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={event =>
            onFilterChange && onFilterChange(event.target.value)
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
        value={query}
        onChange={event => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: `all` }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            type="button"
            className={classNames(
              'button',
              'is-white',
              'is-small',
              'is-rounded',
            )}
            style={{ boxShadow: `none`, pointerEvents: `all` }}
            aria-label="clear search"
            data-cy="clearSearchButton"
            onClick={onClearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
