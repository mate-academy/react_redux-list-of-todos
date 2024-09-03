import { ChangeEvent } from 'react';
import { Filter } from '../../enums/Filter';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setStatus, setQuery } from '../../features/filter/filterSlice';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();

  const { status, query } = useAppSelector(state => state.filter);

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Filter));
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleQueryClear = () => {
    dispatch(setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleFilterChange}
            data-cy="statusSelect"
            value={status}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleQueryChange}
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              onClick={handleQueryClear}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
