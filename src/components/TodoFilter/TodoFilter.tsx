import React from 'react';
import { Status } from '../../types/Status';
interface Props {
  selectedFilter: Status;
  setSelectedFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchTerm: string;
  setSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}
export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  searchTerm,
  setSearchTerm,
  onClear,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={setSelectedFilter}
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
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchTerm.length > 0 && (
          <>
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={onClear}
              />
            </span>
          </>
        )}
      </p>
    </form>
  );
};
