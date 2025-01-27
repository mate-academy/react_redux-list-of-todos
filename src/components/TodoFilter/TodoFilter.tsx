import { Filters, setFilter, setQuery } from '../../features/filter';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export function TodoFilter() {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setFilter(e.target.value as Filters));
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setQuery(e.target.value));
  }

  function handleCleanSearch() {
    dispatch(setQuery(''));
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            {Object.values(Filters).map(filter => {
              return (
                <option value={filter} key={filter}>
                  {filter.slice(0, 1).toUpperCase() + filter.slice(1)}
                </option>
              );
            })}
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
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCleanSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
}
