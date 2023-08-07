import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterAactions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const onStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterAactions.setStatus(event.target.value as Status));
  };

  const onQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterAactions.setQuery(event.target.value));
  };

  const onDeleteQuery = () => dispatch(filterAactions.clearQuery());

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={onStatusSelect}
          >
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
          value={filter.query}
          onChange={onQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onDeleteQuery}
              aria-label="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
