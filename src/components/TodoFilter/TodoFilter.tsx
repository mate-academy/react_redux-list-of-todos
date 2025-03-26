import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { filterByQuery, filterByStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      filterByStatus(event.target.value as 'completed' | 'all' | 'active'),
    );
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByQuery(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(filterByQuery(''));
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
            onChange={handleStatusChange}
            value={status}
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

        {Boolean(query) && (
          <span className="icon is-right">
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
