import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => dispatch(
              filterActions.setStatus(event.target.value),
            )}
            data-cy="statusSelect"
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => dispatch(
            filterActions.setQuery(event.target.value),
          )}
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
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
              onClick={() => dispatch(
                filterActions.setQuery(''),
              )}
            />
          </span>
        )}
      </p>
    </form>
  );
};
