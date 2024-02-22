import { Filters, KeyboardKeys } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(e.target.value));
  };

  const handleFilterValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(e.target.value as Filters));
  };

  const handleResetQuery = () => {
    dispatch(actions.resetQuery());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterValue}>
            <option value={Filters.ALL}>All</option>
            <option value={Filters.ACTIVE}>Active</option>
            <option value={Filters.COMPLETED}>Complete</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={handleInput}
          onKeyDown={e => e.key === KeyboardKeys.Enter && e.preventDefault()}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!filter.query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear search"
              onClick={handleResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
