import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as 'all' | 'completed' | 'active'));
  };

  const handleClearSearch = () => {
    dispatch(setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <label htmlFor="statusSelect" className="sr-only">
          Filter by status
        </label>
        <span className="select">
          <select
            id="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          id="searchInput"
          data-cy="searchInput"
          type="text"
          name="searchQuery"
          className="input"
          placeholder="Search todos..."
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          <button
            data-cy="clearSearchButton"
            type="button"
            name="button"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      </p>
    </form>
  );
};

export default TodoFilter;
