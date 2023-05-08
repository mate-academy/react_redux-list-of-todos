import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const changeStatus = (e: ChangeEvent<HTMLSelectElement>) => dispatch(
    filterActions.filterStatus(e.target.value as Status),
  );

  const changeQuery = (e: ChangeEvent<HTMLInputElement>) => dispatch(
    filterActions.filterQuery(e.target.value),
  );

  const resetQuery = () => dispatch(filterActions.filterQuery(''));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={changeStatus}
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
          className="input"
          placeholder="Search..."
          value={query}
          onChange={changeQuery}
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
              onClick={resetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
