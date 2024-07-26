import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, setQuery } from '../../features/filter';
import { RootState } from '../../app/store';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.filter.status);
  const query = useSelector((state: RootState) => state.filter.query);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const statusToInput = event.target.value as Status;

    dispatch(setStatus(statusToInput));
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const clearSearch = () => {
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
            onChange={handleStatusChange}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          <i className="fas fa-search" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
