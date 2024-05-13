import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { FilterActionTypes } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleQuerryInput = (querry: string) => {
    dispatch({ type: FilterActionTypes.querry, payload: querry });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: FilterActionTypes.change,
      payload: event.target.value as Status,
    });
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          onChange={event => handleQuerryInput(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQuerryInput('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
