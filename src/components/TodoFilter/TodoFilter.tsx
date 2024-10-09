import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  reset: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onInputChange,
  query,
  reset,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={onFilterChange}>
          <option value={FilterTypes.all}>All</option>
          <option value={FilterTypes.active}>Active</option>
          <option value={FilterTypes.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={onInputChange}
        value={query}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={reset}
          />
        )}
      </span>
    </p>
  </form>
);
