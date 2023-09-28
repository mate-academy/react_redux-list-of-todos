import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actionFilter as actions } from '../../features/filter';
import { SelectStatus } from '../../types';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.SetQuery(event.target.value as string));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(event.target.value as SelectStatus));
  };

  const handleRest = () => dispatch(actions.removeQuery());

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter.status}
            data-cy="statusSelect"
            onChange={handleStatusChange}
          >
            <option value={SelectStatus.ALL}>All</option>
            <option value={SelectStatus.ACTIVE}>Active</option>
            <option value={SelectStatus.COMPLETED}>Completed</option>
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
          onChange={handleInputSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>

            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="Mute volume"
              className="delete"
              onClick={handleRest}
            />
          </span>
        )}
      </p>
    </form>
  );
};
