import { useState } from 'react';
import { FilterQuery } from '../../enums';

type Props = {
  filterQuery: string,
  applyFilter: (value: string) => void,
  applyQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterQuery,
  applyFilter,
  applyQuery,
}) => {
  const [query, setQuery] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterBy = event.target.value;

    if (filterBy !== filterQuery) {
      applyFilter(filterBy);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleReset = () => {
    setQuery('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            defaultValue={filterQuery}
          >
            <option value={FilterQuery.ALL}>All</option>
            <option value={FilterQuery.ACTIVE}>Active</option>
            <option value={FilterQuery.COMPLETED}>Completed</option>
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
          onChange={handleChange}
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
              onClick={handleReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
