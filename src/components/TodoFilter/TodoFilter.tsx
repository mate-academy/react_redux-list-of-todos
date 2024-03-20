import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Filter, actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector<Filter>(state => state.filter);
  const { setFilter } = actionsFilter;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setFilter({
        query,
        status: event.target.value.toLocaleLowerCase() as Status,
      }),
    );
  };

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ query: event.target.value, status }));
  };

  const clearSearch = () => {
    dispatch(setFilter({ query: '', status }));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select value={status} data-cy="statusSelect" onChange={handleSelect}>
            {['All', 'Active', 'Completed'].map(option => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handlerSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
