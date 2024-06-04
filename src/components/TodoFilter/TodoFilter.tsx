import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';
import { StatusEnum } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleStatusSelect = (event: string) => {
    if (
      event === StatusEnum.all ||
      event === StatusEnum.active ||
      event === StatusEnum.completed
    ) {
      dispatch(actionsFilter.status(event));
    }
  };

  const handleQueryInput = (q: string) => {
    dispatch(actionsFilter.query(q));
  };

  const handleClearButton = () => {
    dispatch(actionsFilter.clear());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={value => handleStatusSelect(value.currentTarget.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => handleQueryInput(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              onClick={handleClearButton}
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
