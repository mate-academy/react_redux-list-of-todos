import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  onSelectedStatus: (status: Status) => void;
  selectedStatus: Status;
  searchValue: string;
  onSearchValue: (searchValue: string) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onSelectedStatus,
  selectedStatus,
  searchValue,
  onSearchValue,
  onClearSearch,
}: Props) => (
  <form className="field has-addons" onClick={event => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelectedStatus(event.target.value as Status)}
          value={selectedStatus}
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
        onChange={event => onSearchValue(event.target.value)}
        value={searchValue}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchValue.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearSearch}
          />
        </span>
      )}
    </p>
  </form>
);
