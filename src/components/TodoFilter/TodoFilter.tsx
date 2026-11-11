import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const { query, status } = useAppSelector(state => state.filter);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
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
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
