import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter, updateQuery } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const changeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Status;

    dispatch(updateFilter(newStatus));
  };

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateQuery(event.target.value));
  };

  const removeQuery = () => {
    dispatch(updateQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={changeStatus}>
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
