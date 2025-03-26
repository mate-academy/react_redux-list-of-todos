import { Status } from '../../types/Status';

interface TodoFilterProps {
  status: Status;
  search: string;
  onFilterChange: (status: Status) => void;
  onSearchChange: (search: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  status,
  search,
  onFilterChange,
  onSearchChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={e => onFilterChange(e.target.value as Status)}
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

      {search && (
        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
          onClick={() => onSearchChange('')}
        >
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
