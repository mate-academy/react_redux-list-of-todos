import React from 'react';
import { setQuery, setStatus } from '../../features/filter';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector((state: RootState) => state.filter.query);
  const dispatch = useDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
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
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      </p>
    </form>
  );
};
