import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterTodoActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterTodoActions.setQuery(event.target.value));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterTodoActions.setStatus(event.target.value));
  };

  const handleInputClear = () => {
    dispatch(filterTodoActions.setQuery(''));
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
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete-button"
              onClick={handleInputClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
