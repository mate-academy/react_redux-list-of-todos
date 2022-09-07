import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as filterActions, Filter } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  return (
    <form
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              (event) => {
                event.preventDefault();
                dispatch(filterActions
                  .filterByCompleted(event.target.value as Status));
              }
            }
          >
            <option
              value={Filter.ALL}
            >
              All
            </option>
            <option
              value={Filter.ACTIVE}
            >
              Active
            </option>
            <option
              value={Filter.COMPLETED}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="serch"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            dispatch(filterActions.filterByQuery(e.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
