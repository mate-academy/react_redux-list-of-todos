import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

type Props = {
  query: string,
  filter: Status,
  handleChange(event: ChangeEvent<HTMLInputElement>): void,
  handleReset(): void,
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    filter,
    handleChange,
    handleReset,
  },
) => {
  const dispatch = useDispatch();
  const setFilterActive = () => dispatch(filterActions.filterActive());
  const setFilterCompleted = () => dispatch(filterActions.filterCompleted());
  const setFilterAll = () => dispatch(filterActions.filterAll());

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Status.active:
        return setFilterActive();

      case Status.completed:
        return setFilterCompleted();

      case Status.all:
        return setFilterAll();

      default:
        return setFilterAll();
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
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
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
