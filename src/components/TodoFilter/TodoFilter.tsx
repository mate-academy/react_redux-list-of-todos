import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { FilterStatus } from '../../types/FilterStatus';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const setStatusActive = () => dispatch(filterActions.setFilterActive());
  const setStatusCompleted = () => dispatch(filterActions.setFilterCompleted());
  const setStatusALL = () => dispatch(filterActions.setFilterAll());

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case FilterStatus.ACTIVE:
        setStatusActive();
        break;

      case FilterStatus.COMPLETED:
        setStatusCompleted();
        break;

      case FilterStatus.ALL:
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
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelect}
          >
            <option value={FilterStatus.ALL}>
              All
            </option>
            <option value={FilterStatus.ACTIVE}>
              Active
            </option>
            <option value={FilterStatus.COMPLETED}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
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
