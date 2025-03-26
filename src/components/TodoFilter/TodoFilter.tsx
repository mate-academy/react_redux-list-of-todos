import React from 'react';
import { useAppSelector } from '../../app/store';
import {
  actions as filterActions,
  filterSelector,
} from '../../features/filter';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(filterSelector);
  const dispatch = useDispatch();

  const manageFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatusFilter(event.target.value as Status));
  };

  const manageQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setSearchQuery(event.target.value));
  };

  const manageClearSearch = () => {
    dispatch(filterActions.resetFilters());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={manageFilterChange}>
            <option value={Status.All}>{Status.All}</option>
            <option value={Status.Active}>{Status.Active}</option>
            <option value={Status.Completed}>{Status.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={manageQueryChange}
          value={filter.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={manageClearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
