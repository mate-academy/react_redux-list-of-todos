import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { SearchField } from '../../types/SearchField';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const setQuery = (value: string) => dispatch(filterActions.setQuery(value));
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const removeQuery = () => dispatch(filterActions.removeQuery());
  const handleRemoveQuery = () => {
    removeQuery();
  };

  const setStatus = (value: string) => dispatch(filterActions.setStatus(value));
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
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
            onChange={handleSelectChange}
          >
            <option value={SearchField.ALL}>All</option>
            <option value={SearchField.ACTIVE}>Active</option>
            <option value={SearchField.COMPLETED}>Completed</option>
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
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleRemoveQuery}
          />
        </span>
      </p>
    </form>
  );
};
