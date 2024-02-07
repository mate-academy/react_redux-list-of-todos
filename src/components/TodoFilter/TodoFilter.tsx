import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'all':
        dispatch(filterActions.filterAll());
        break;

      case 'active':
        dispatch(filterActions.filterActive());
        break;

      case 'completed':
        dispatch(filterActions.filterCompleted());
        break;

      default:
        break;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.filterByQuery(event.target.value));
  };

  const handleInputClear = () => dispatch(filterActions.filterByQuery(''));

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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clearSearchButton"
              onClick={handleInputClear}
            />
          )}

        </span>
      </p>
    </form>
  );
};
