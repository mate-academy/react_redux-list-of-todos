import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const onChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentStatus: Status = Object.values(Status)
      .find(status => status === event.target.value) || Status.ALL;

    dispatch(filterActions.setStatus(currentStatus));
  };

  const onInputQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  const query = useAppSelector(state => state.filter.query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={onChangeStatus}
          >
            {Object.values(Status).map(status => (
              <option value={status}>{status}</option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          onChange={onInputQuery}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="Clear"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
