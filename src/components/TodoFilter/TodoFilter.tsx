import { ChangeEvent } from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  filterByStatus: FilterStatus;
  setFilterByStatus: (status: FilterStatus) => void;
  filterByContent: string;
  setFilterByContent: (search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterByStatus,
  setFilterByStatus,
  filterByContent,
  setFilterByContent,
}) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    switch (status) {
      case 'active':
        setFilterByStatus(FilterStatus.ACTIVE);
        break;
      case 'completed':
        setFilterByStatus(FilterStatus.COMPLETE);
        break;
      case 'all':
      default:
        setFilterByStatus(FilterStatus.ALL);
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterByStatus}
            onChange={handleSelect}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETE}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterByContent}
          onChange={event => (
            setFilterByContent(event.target.value)
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filterByContent && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear search query"
              onClick={() => setFilterByContent('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
