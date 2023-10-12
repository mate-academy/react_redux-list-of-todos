import { FilterStatus } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearQuery, setCategory, setQuery } from '../../features/filter';

export const TodoFilter = () => {
  const filterStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterBy = event.target.value;

    if (filterBy !== filterStatus) {
      dispatch(setCategory(filterBy as FilterStatus));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleReset = () => {
    dispatch(clearQuery());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            defaultValue={filterStatus}
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
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
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
