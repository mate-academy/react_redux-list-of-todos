import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(store => store.filter);

  const handleOnStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(actions.setStatus(event.target.value as Status));
  };

  const handleOnQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const handleOnDelete = () => {
    dispatch(actions.setQuery(''));
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
            onChange={handleOnStatusChange}
          >
            <option value={FilterStatus.All}>All</option>
            <option value={FilterStatus.Active}>Active</option>
            <option value={FilterStatus.Completed}>Completed</option>
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
          onChange={handleOnQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right">
            <button
              aria-label="Clear Search Button "
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleOnDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
