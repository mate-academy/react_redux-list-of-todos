import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  return (
    <div className="field has-addons">
      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => dispatch(setStatus(e.target.value as Status))}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => dispatch(setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        {query && (
          <button
            type="button"
            data-cy="clearSearchButton"
            className="delete is-small is-right"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 4,
              border: 'none',
              padding: '0',
            }}
            onClick={() => dispatch(setQuery(''))}
          />
        )}
      </div>
    </div>
  );
};
