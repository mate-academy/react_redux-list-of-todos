import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setQuery as setFilterQuery,
  setStatus as setFilterStatus,
} from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
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
            onChange={e => {
              dispatch(setFilterStatus(e.target.value as Status));
            }}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          onChange={e => {
            dispatch(setFilterQuery(e.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(setFilterQuery(''));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
