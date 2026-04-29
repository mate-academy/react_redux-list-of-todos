import React from 'react';
import { Filter } from '../../types/Status';

interface Props {
  filter: Filter;
  handleStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteQuery: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  handleStatus,
  changeQuery,
  deleteQuery,
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
            value={filter.status}
            onChange={handleStatus}
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
          onChange={changeQuery}
          value={filter.query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteQuery}
              disabled={!filter.query}
            />
          </span>
        )}
      </p>
    </form>
  );
};
