import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { clearQuery, setQuery, setStatus } from '../../features/filterSlice';
import { FilterField } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { query, filterField } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterField}
            onChange={e => dispatch(setStatus(e.target.value as FilterField))}
          >
            <option value={FilterField.All}>All</option>
            <option value={FilterField.Active}>Active</option>
            <option value={FilterField.Completed}>Completed</option>
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
          onChange={e => dispatch(setQuery(e.target.value))}
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
              onClick={() => dispatch(clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
