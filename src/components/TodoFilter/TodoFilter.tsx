import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';
import { setStatus, setQuery } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value.toLowerCase()));
  };

  const clearQuery = () => {
    dispatch(setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusChange}
            value={status}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          data-cy="searchInput"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              data-cy="clearSearchButton"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </div>
    </form>
  );
};
