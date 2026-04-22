import React, { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={event => {
              dispatch(
                filterSlice.actions.setFilter(event.target.value as Status),
              );
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
          value={query}
          onChange={event => {
            const currQuery = event.target.value;

            setQuery(currQuery);
            dispatch(filterSlice.actions.setQuery(currQuery.trim()));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                dispatch(filterSlice.actions.setQuery(''));
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
