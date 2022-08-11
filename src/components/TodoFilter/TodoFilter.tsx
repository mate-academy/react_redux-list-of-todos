import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { actions as FilteredActions } from '../../store/filter';
import { Sort } from '../../types/Sort';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);
  const handleSelectChange = (value: string) => {
    switch (value) {
      case Sort.active:
        dispatch(FilteredActions.Active());
        break;

      case Sort.completed:
        dispatch(FilteredActions.Completed());
        break;

      default:
        dispatch(FilteredActions.No());
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleSelectChange(event.target.value as Sort)}
          >
            <option value={Sort.all}>All</option>
            <option value={Sort.active}>Active</option>
            <option value={Sort.completed}>Completed</option>
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
          onChange={(event) => {
            dispatch(FilteredActions.Query(event.target.value));
          }}
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
              onClick={() => dispatch(FilteredActions.QueryClear())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
