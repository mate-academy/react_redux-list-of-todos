import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const onSetStatus = (newStatus: string) => (
    dispatch(filterActions.setStatus(newStatus))
  );

  const onSetQwery = (newQwery: string) => (
    dispatch(filterActions.setQwery(newQwery))
  );

  const onDeleteQwery = () => (
    dispatch(filterActions.deleteQwery())
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={e => onSetStatus(e.target.value)}
            data-cy="statusSelect"
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
          onChange={(e) => onSetQwery(e.target.value)}
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
            onClick={onDeleteQwery}
          />
        </span>
      </p>
    </form>
  );
};
