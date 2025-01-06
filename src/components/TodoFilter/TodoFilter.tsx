import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.query.query);

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const statusOptions = ['all', 'active', 'completed'];

  const StatusGuard = (status: string): status is Status => {
    return statusOptions.includes(status);
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (StatusGuard(event.target.value)) {
      dispatch(actions.setStatus(event.target.value));
    }
  };

  const handleClearQuery = () => {
    dispatch(actions.clearQuery());
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
            onChange={event => handleStatus(event)}
          >
            {statusOptions.map(option => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" onClick={handleClearQuery}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
