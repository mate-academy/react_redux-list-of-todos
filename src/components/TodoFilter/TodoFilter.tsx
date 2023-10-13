import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionsFilter.setStatus(event.target.value));
  };

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsFilter.setQuery(event.target.value));
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    dispatch(actionsFilter.setQuery(''));
    setQuery('');
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
            onChange={handleChangeStatus}
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
          onChange={handleSetQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete search text"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
