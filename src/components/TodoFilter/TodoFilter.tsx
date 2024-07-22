import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice, StatusType } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { changeStatus, changeQuery } = filterSlice.actions;
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => dispatch(changeStatus(e.target.value as StatusType))}
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
          onChange={e => dispatch(changeQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(changeQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
