import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Status.ACTIVE:
        return dispatch(actions.status(Status.ACTIVE));
      case Status.COMPLETED:
        return dispatch(actions.status(Status.COMPLETED));
      case Status.ALL:
        return dispatch(actions.status(Status.ALL));
      default:
        return event.target.value;
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.query(event.target.value));
  };

  const handleClearQuery = () => {
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
            onChange={handleSelectChange}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          placeholder="Search..."
          onChange={handleQueryChange}
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
              onClick={handleClearQuery}
              aria-label="close"
            />
          )}

        </span>
      </p>
    </form>
  );
};
