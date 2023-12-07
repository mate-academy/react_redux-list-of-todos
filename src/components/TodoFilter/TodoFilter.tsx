import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { FilterStatusValues } from '../../types/FilterStatusValues';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.filter);

  const setStatusActive = () => dispatch(filterActions.setFilterActive());
  const setStatusCompleted = () => dispatch(filterActions.setFilterCompleted());
  const setStatusALL = () => dispatch(filterActions.setFilterAll());

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case FilterStatusValues.Active:
        setStatusActive();
        break;

      case FilterStatusValues.Completed:
        setStatusCompleted();
        break;

      case FilterStatusValues.All:
      default:
        setStatusALL();
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setFilterQuery(e.target.value));
  };

  const handleQueryClear = () => {
    dispatch(filterActions.setFilterQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect} value={status}>
            <option value={FilterStatusValues.All}>All</option>
            <option value={FilterStatusValues.Active}>Active</option>
            <option value={FilterStatusValues.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="close btn"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
