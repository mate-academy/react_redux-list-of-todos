import React from 'react';
import { actions as filterActions } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    dispatch(filterActions.setQuery(query));
  };

  const handleClearSearch = () => {
    dispatch(filterActions.removeQuery());
  };

  return (
    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={filter.query}
        onChange={handleSearch}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {filter.query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            aria-label="clear search"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      )}
    </p>
  );
};
