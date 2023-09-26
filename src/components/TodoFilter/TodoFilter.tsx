import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter = () => {
  const filter = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={filter.status}
            onChange={(event) => dispatch(filterActions.setStatus({
              status: event.target.value as 'all' | 'completed' | 'active',
            }))}
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
          type="search"
          value={filter.query}
          className="input"
          placeholder="Search..."
          onChange={(event) => dispatch(filterActions.setQuery({
            query: event.target.value,
          }))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
