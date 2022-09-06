import { FC } from 'react';
import { ComplitedFilter } from '../../types/ComplitedFilter';

interface Props {
  complitedFilter: ComplitedFilter,
  setComplitedFilter: (complitedFilter: ComplitedFilter) => void,
  searchQuery: string,
  setSearchQuery: (query: string) => void,
}

export const TodoFilter: FC<Props> = (props) => {
  const {
    complitedFilter,
    setComplitedFilter,
    searchQuery,
    setSearchQuery,
  } = props;

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={complitedFilter}
            onChange={((event) => setComplitedFilter(
              event.target.value as ComplitedFilter,
            ))}
          >
            <option value={ComplitedFilter.All}>All</option>
            <option value={ComplitedFilter.Active}>Active</option>
            <option value={ComplitedFilter.Completed}>Completed</option>
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
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
