import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearQuery, setNewQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const isButtonVisible =
    useAppSelector(state => state.filter.query).length !== 0;

  function handleSetStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value as Status;

    dispatch(setStatus(status));
  }

  function handleSetQuery(newQuery: string) {
    setQuery(newQuery);
    dispatch(setNewQuery(newQuery.trim()));
  }

  function handleClearQuery() {
    setQuery('');
    dispatch(clearQuery());
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSetStatus}>
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
          value={query}
          placeholder="Search..."
          onChange={event => handleSetQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {isButtonVisible && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
