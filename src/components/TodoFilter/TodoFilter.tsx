import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

enum Option {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const changeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === Option.ALL
        || event.target.value === Option.ACTIVE
        || event.target.value === Option.COMPLETED
    ) {
      dispatch(actions.setStatus(event.target.value));
    }
  };

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => (
    dispatch(actions.setQuery(event.target.value)));

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => changeSelect(event)}
          >
            <option value={Option.ALL}>All</option>
            <option value={Option.ACTIVE}>Active</option>
            <option value={Option.COMPLETED}>Completed</option>
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
          onChange={(event) => changeQuery(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
