import React from 'react';
import { actions } from './../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface FiltersType {
  query: string;
  status: string;
}

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector<FiltersType>(state => state.filter);

  const filterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.statusFilter(event.target.value));
  };

  const filterInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.queryFilter(event.target.value));
  };

  const handleCrosButton = () => {
    dispatch(actions.queryFilter(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select onChange={filterSelect} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={filterInputValue}
          value={filters.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filters.query !== '' && (
            <button
              onClick={handleCrosButton}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
