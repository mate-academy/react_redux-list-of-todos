import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'completed':
        return dispatch(filterActions.status(event.target.value));

      case 'active':
        return dispatch(filterActions.status(event.target.value));

      case 'all':
        return dispatch(filterActions.status(event.target.value));

      default:
        return event.target.value;
    }
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.query(event.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatus}>
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
          onChange={handleQuery}
          value={filter}
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
          />
        </span>
      </p>
    </form>
  );
};
