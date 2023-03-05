import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { FilterOption } from '../../enums/FilterOptions';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(e) => {
              dispatch(actions.setStatus(e.target.value as FilterOption));
            }}
            data-cy="statusSelect"
          >
            <option value={FilterOption.All}>All</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
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
            dispatch(actions.setQuery(e.currentTarget.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
