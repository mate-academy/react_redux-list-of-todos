import React from 'react';
import { actions } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const handlerSelector = (e: React.ChangeEvent<HTMLSelectElement>) => (
    dispatch(actions.setStatus(e.target.value))
  );
  const handlerQuery = (e: React.ChangeEvent<HTMLInputElement>) => (
    dispatch(actions.setQuery(e.target.value))
  );
  const handlerQueryCancel = () => (
    dispatch(actions.setQuery(''))
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerSelector}
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
          value={query}
          onChange={handlerQuery}
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
              onClick={handlerQueryCancel}
            />
          )}
        </span>
      </p>
    </form>
  );
};
