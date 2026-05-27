/* eslint-disable no-param-reassign */

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  return (
    <div className="block">
      <div className="field is-grouped">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            className="input"
            placeholder="Search..."
            value={query}
            onChange={e => dispatch(setQuery(e.target.value))}
          />
        </p>

        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={status}
              onChange={e => dispatch(setStatus(e.target.value as Status))}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </span>
        </p>

        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            onClick={() => dispatch(setQuery(''))}
          >
            clear
          </button>
        )}
      </div>
    </div>
  );
};
