import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { rename, updateQuery } from '../../features/filter';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const select = useAppSelector(state => state.filter);

  const handleClearSearch = () => {
    dispatch(updateQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select.status}
            onChange={event => dispatch(rename(event.target.value))}
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
          value={select.query}
          onChange={event => dispatch(updateQuery(event.target.value))}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {select.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
