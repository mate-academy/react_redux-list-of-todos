import { useDispatch } from 'react-redux';
import { FilterField } from '../../types/FilterField';
import { useAppSelector } from '../../hooks/useAppSelector';
import { clearQuery, setQuery, setStatus } from '../../features/filterSlice';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const { query } = useAppSelector(state => state.filter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => dispatch(setStatus(e.target.value as FilterField))}
          >
            <option value={FilterField.All}>All</option>
            <option value={FilterField.Active}>Active</option>
            <option value={FilterField.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={e => dispatch(setQuery(e.target.value))}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'All' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              onClick={() => dispatch(clearQuery())}
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
