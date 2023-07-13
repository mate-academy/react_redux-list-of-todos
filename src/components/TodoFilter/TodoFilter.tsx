import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleChangeStatus = (value: string) => {
    dispatch(filterActions.changeStatus(value as Status));
  };

  const handleSetQuery = (value: string) => {
    dispatch(filterActions.setQuery(value));
  };

  const handleClearQuery = () => {
    dispatch(filterActions.clearQuery());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(e) => handleChangeStatus(e.target.value)}
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
          name="query"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSetQuery(e.target.value)}
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
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
