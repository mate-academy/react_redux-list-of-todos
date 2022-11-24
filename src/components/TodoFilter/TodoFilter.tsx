import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const handleStatusSelect = (value: string) => {
    switch (value) {
      case Status.ACTIVE:
        return dispatch(actions.status(Status.ACTIVE));

      case Status.COMPLETED:
        return dispatch(actions.status(Status.COMPLETED));

      case Status.ALL:
      default:
        return dispatch(actions.status(Status.ALL));
    }
  };

  const handleQueryChange = (value: string) => {
    dispatch(actions.query(value));
  };

  const handleResetQuery = () => {
    dispatch(actions.query(''));
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
            onChange={event => (handleStatusSelect(event.target.value))}
          >
            <option value="all">{Status.ALL}</option>
            <option value="active">{Status.ACTIVE}</option>
            <option value="completed">{Status.COMPLETED}</option>
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
          onChange={event => handleQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="resetbutton"
              onClick={() => handleResetQuery()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
