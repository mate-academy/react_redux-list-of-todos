/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as FilterActions } from '../../features/filter';
import { Status, StatusType } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleChangeQuery = (value: string) => (
    dispatch(FilterActions.setQuery(value)));

  const handleChangeStatus = (value: Status) => (
    dispatch(FilterActions.setStatus(value)));

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();

    handleChangeQuery('');
    handleChangeStatus('all');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(e) => handleChangeStatus(e.target.value as Status)}
          >
            <option value={StatusType.ALL}>All</option>
            <option value={StatusType.ACTIVE}>Active</option>
            <option value={StatusType.COMPLETED}>Completed</option>
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
          onChange={(e) => handleChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
