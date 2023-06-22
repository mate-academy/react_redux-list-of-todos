/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { FilterByParameters } from '../../utils/filterByParameters';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const updateQuery = (value: string) => {
    dispatch(filterActions.setQuery(value));
  };

  const updateStatus = (value: Status) => {
    dispatch(filterActions.setStatus(value));
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
            onChange={({ target }) => updateStatus(target.value as Status)}
          >
            <option value="all">
              {FilterByParameters.All}
            </option>
            <option value="active">
              {FilterByParameters.Active}
            </option>
            <option value="completed">
              {FilterByParameters.Copleted}
            </option>
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
          onChange={({ target }) => updateQuery(target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: FilterByParameters.All }}
          >
            <button
              id="searchButton"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => updateQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
