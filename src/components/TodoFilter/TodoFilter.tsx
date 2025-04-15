import React from 'react';
import { setStatus, setQuery } from '../../features/filter';
import { useAppSelector } from '../../app/store';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector(store => store.filter);
  const dispatch = useDispatch();

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
            onChange={event => {
              dispatch(setStatus(event.target.value as Status));
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
          placeholder="Search..."
          value={query}
          onChange={event => {
            dispatch(setQuery(event.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(setQuery(''));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
