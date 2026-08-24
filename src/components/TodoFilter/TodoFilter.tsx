import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, status } = useSelector((state: RootState) => state.filter);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  };

  const handleStatusChange = (newStatus: Status) => {
    dispatch(setStatus(newStatus));
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => handleStatusChange(e.target.value as Status)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          data-cy="searchInput"
          value={query}
          onChange={handleQueryChange}
        />
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
