/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const handleSelector = (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.currentTarget.value));
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.currentTarget.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onClick={handleSelector}>
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
          placeholder="Search..."
          value={query}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.trim() !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
