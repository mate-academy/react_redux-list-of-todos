import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { actions as filterActions } from '../../../../features/filter';

export const QueryControl: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const setQuery = (value: string) => {
    dispatch(filterActions.updateQuery(value));
  };

  return (
    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.length > 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  );
};
