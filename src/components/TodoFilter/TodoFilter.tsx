/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Status, actions as filterActions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const queryState = useAppSelector(state => state.filter.query);

  const query = (value: string) => dispatch(filterActions.query(value));
  const setStatus = (value: Status) => dispatch(filterActions.status.setStatus(value));

  function handleQuery(event: React.ChangeEvent<HTMLInputElement>) {
    query(event.target.value);
  }

  function handleStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value as Status);
  }

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
          value={queryState}
          onChange={handleQuery}
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
