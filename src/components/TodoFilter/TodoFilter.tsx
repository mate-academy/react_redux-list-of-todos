import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { searchedQuery, searchedStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchedQuery(event.target.value));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(searchedStatus(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(searchedQuery(''));
  };

  return (
    <>
      <form className="field has-addons" onSubmit={e => e.preventDefault()}>
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
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>
          {query.length !== 0 && (
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
    </>
  );
};
