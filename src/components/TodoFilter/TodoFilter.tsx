import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(store => store.filter);
  const dispatch = useAppDispatch();

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.changeQuery(event.target.value));
  };

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as Status));
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
            onChange={changeStatus}
          >
            {Object.entries(Status).map(([key, value]) => (
              <option value={value} key={key}>{key}</option>
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
          value={query}
          onChange={changeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
