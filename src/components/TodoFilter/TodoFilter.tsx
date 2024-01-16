import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filterState = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(filterActions.setFilterBy(e.target.value as Status));
            }}
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterState.query}
          onChange={(e) => {
            dispatch(filterActions.setQuery(e.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filterState.query.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              // eslint-disable-next-line no-console
              onClick={() => dispatch(filterActions.clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
