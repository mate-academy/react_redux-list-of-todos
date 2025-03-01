import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { FILTERS } from '../../types/Filters';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleInput = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setStatus(event.target.value as (typeof FILTERS)[keyof typeof FILTERS]),
    );
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
            <option value={FILTERS.ALL}>All</option>
            <option value={FILTERS.ACTIVE}>Active</option>
            <option value={FILTERS.COMPLETED}>Completed</option>
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
          onChange={e => handleInput(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length !== 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
