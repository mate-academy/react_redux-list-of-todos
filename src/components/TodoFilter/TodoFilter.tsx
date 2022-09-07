import { FC } from 'react';
import { FilterBy } from '../../types/Todo';

interface Props {
  searchQuery: string,
  setSearchQuery: (title:string) => void,
  completedFilter: string,
  setCompletedFilter: (filter: FilterBy) => void,
}

export const TodoFilter: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  completedFilter,
  setCompletedFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completedFilter}
          onChange={event => setCompletedFilter(event.target.value as FilterBy)}
        >
          <option value={FilterBy.NONE}>All</option>
          <option value={FilterBy.ACTIVE}>Active</option>
          <option value={FilterBy.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => (
          setSearchQuery(event.target.value)
        )}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
