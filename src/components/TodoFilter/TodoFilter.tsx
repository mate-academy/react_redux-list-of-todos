import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={ev => {
              dispatch(
                filterSlice.actions.updateStatus(ev.target.value as Status),
              );
            }}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={ev =>
            dispatch(filterSlice.actions.updateQuery(ev.target.value))
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.trim() && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(filterSlice.actions.clearQuery());
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
