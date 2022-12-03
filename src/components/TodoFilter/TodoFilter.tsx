import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const all = () => dispatch(actions.all());
  const active = () => dispatch(actions.active());
  const completed = () => dispatch(actions.completed());

  const handleStatus = (value: string) => {
    switch (value) {
      case 'completed':
        return completed();

      case 'active':
        return active();

      default:
        return all();
    }
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
            value={filter}
            onChange={(event) => handleStatus(event.target.value)}
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
