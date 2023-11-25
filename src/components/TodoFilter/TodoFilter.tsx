import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StatusFilterSelect } from '../../enums/StatusFilterSelect';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const dispatch = useAppDispatch();

  const { query, status } = useAppSelector(state => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={handleSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(e) => {
              dispatch(filterActions.filterBySelect(e.target.value as Status));
            }}
          >
            <option value={StatusFilterSelect.ALL}>All</option>
            <option value={StatusFilterSelect.ACTIVE}>Active</option>
            <option value={StatusFilterSelect.COMPLETED}>Completed</option>
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
          onChange={(e) => {
            dispatch(filterActions.filterByQuery(e.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {
            query && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => dispatch(filterActions.filterByQuery(''))}
              />
            )
          }
        </span>
      </p>
    </form>
  );
};
