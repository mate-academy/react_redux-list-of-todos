import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Filters } from '../../types/Filters';

type Props = {
  status: string;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ status, query }) => {
  const dispatch = useAppDispatch();

  const handleStatusChange = (newStatus: string) => {
    dispatch(setStatus(newStatus));
  };

  const handleQueryChange = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  const handleQueryClear = () => {
    dispatch(setQuery(''));
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
            value={status}
            onChange={event => handleStatusChange(event.target.value)}
          >
            <option value={Filters.All}>All</option>
            <option value={Filters.Active}>Active</option>
            <option value={Filters.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          onChange={event => handleQueryChange(event.target.value)}
          placeholder="Search..."
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
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
