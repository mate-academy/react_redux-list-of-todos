import React from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

const statusOptions: Status[] = ['all', 'active', 'completed'];

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'all':
        dispatch(filterActions.setFilterAll());
        break;
      case 'active':
        dispatch(filterActions.setFilterActive());
        break;
      case 'completed':
        dispatch(filterActions.setFilterCompleted());
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setFilterQuery(event.target.value));
  };

  const handleInputClear = () => {
    dispatch(filterActions.setFilterQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={status}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
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
