import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setAllFilter,
  setActiveFilter,
  setCompletedFilter,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'active':
        dispatch(setActiveFilter());
        break;
      case 'completed':
        dispatch(setCompletedFilter());
        break;
      default:
        dispatch(setAllFilter(''));
        break;
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
