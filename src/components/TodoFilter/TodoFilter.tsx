import { useState } from 'react';
import { Status } from '../../types/Status';

type Props = {
  onSearchChange: (search: string) => void;
  onOptionChange: (option: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onSearchChange,
  onOptionChange,
}) => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);
    onSearchChange(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onOptionChange(e.target.value as Status)}
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
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearch('');
                onSearchChange('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
