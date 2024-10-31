import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setQuery, selectQuery } from '../../features/filter';
import { FILTER } from '../TodoList';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FILTER;

    dispatch(setFilter(selectedFilter));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectFilter}>
            <option value={FILTER.ALL}>All</option>
            <option value={FILTER.ACTIVE}>Active</option>
            <option value={FILTER.COMPLETED}>Completed</option>
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

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
