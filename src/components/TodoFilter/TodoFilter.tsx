import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const onFilterStatusChanged = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.value !== status) {
      dispatch(filterActions.setStatus(event.target.value as Status));
    }
  };

  const onQueryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== query) {
      dispatch(filterActions.setQuery(event.target.value));
    }
  };

  const handleResetQueryButtonPressed = () => {
    dispatch(filterActions.setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onFilterStatusChanged}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={onQueryChanged}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={handleResetQueryButtonPressed}
                data-cy="clearSearchButton"
                type="button"
                className="delete"
              />
            </span>
          )}
      </p>
    </form>
  );
};
