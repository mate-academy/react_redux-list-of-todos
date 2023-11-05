import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filteAction } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filteAction.setStataus(event.target.value as Status));
  };

  const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filteAction.setQuery(event.target.value));
  };

  const resetQuary = () => {
    dispatch(filteAction.setQuery(''));
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
            onChange={changeStatus}
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
          value={query}
          onChange={queryChange}
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
              onClick={resetQuary}
            />
          </span>
        )}
      </p>
    </form>
  );
};
