import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(store => store.filter.query);

  const setStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => dispatch(filterActions.setStatus(e.target.value as Status));

  const setQuery = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => dispatch(filterActions.setQuery(e.target.value));

  const dropQuery = () => dispatch(filterActions.setQuery(''));

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={setStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={setQuery}
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={dropQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
