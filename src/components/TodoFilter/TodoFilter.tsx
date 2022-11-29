import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filterParams';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector(state => state.filter);

  const selectStatuses = [
    { title: 'All', value: Status.All },
    { title: 'Active', value: Status.Active },
    { title: 'Completed', value: Status.Completed },
  ];

  const changeQuery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => dispatch(filterActions.setQuery(event.target.value));

  const clearQuery = () => {
    dispatch(filterActions.setQuery(''));
  };

  const changeStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => dispatch(filterActions.setStatus(event.target.value as Status));

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={changeStatus}
            value={filterParams.status}
          >
            {selectStatuses.map(status => (
              <option
                key={status.value}
                value={status.value}
              >
                {status.title}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterParams.query}
          onChange={changeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filterParams.query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear-button"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
