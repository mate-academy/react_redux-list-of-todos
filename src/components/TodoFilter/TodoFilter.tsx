import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const searchValue = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const status = (value: string) => dispatch(actions.filterStatus(value));
  const query = (value: string) => dispatch(actions.filterQuery(value));
  const clear = () => dispatch(actions.filterClear());

  const handleInput = (value: string) => {
    query(value);
  };

  const handleSelect = (value: string) => {
    status(value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => handleSelect(event.currentTarget.value)}
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
          value={searchValue.query}
          onChange={(event) => handleInput(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="button"
              onClick={clear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
