import { actions as TodoActions } from '../../features/filter';
import { useAppDispatch } from '../../features/hooks';
import { FilterStatus } from '../../utils/FilterStatus';
import React from 'react';

type Props = {
  filterBy: string;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ query, filterBy }) => {
  const dispatch = useAppDispatch();

  const setFilterBy = (status: FilterStatus) =>
    dispatch(TodoActions.setFilter(status));

  const setQuery = (queryToSet: string) =>
    dispatch(TodoActions.setQuery(queryToSet));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={event => setFilterBy(event.target.value as FilterStatus)}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
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
          onChange={event => setQuery(event.target.value.trimStart())}
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
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
