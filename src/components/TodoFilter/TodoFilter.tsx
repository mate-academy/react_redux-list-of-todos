/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={event => {
              dispatch(actionsFilter.setStatus(event.target.value as Status));
            }}
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
          value={filter.query}
          onChange={event => {
            dispatch(actionsFilter.setQuery(event.target.value));
          }}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actionsFilter.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
