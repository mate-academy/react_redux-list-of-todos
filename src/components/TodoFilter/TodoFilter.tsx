import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';

import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();

  const reset = () => {
    dispatch(filterSlice.actions.query(''));
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.query(event.target.value));
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value as Status) {
      case Status.ACTIVE:
        dispatch(filterSlice.actions.Active());

        return;
      case Status.COMPLETED:
        dispatch(filterSlice.actions.Completed());

        return;
      default:
        dispatch(filterSlice.actions.All());

        return;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={handleChangeQuery}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right pointerEvents">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
