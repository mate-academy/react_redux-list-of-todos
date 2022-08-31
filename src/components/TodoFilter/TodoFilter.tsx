import { FC, memo } from 'react';
import { FilterType } from '../../types/FilterType';

interface Props {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  searchQuery: string;
  onChange: (val: string) => void;
  onAppliedChange: (val: string) => void;
}

export const TodoFilter: FC<Props> = memo(({
  filterType,
  onFilterChange,
  searchQuery,
  onChange,
  onAppliedChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={(event) => onFilterChange(event.target.value as FilterType)}
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
        value={searchQuery}
        onChange={(event) => {
          const { value } = event.target;

          onChange(value);
          onAppliedChange(value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onChange('');
              onAppliedChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
));
