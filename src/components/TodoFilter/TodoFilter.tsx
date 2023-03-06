import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { FilterOption } from '../../enums/FilterOptions';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useDispatch();

  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(e.target.value as FilterOption));
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(e.currentTarget.value));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleSelectChange}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              data-cy="clearSearchButton"
              aria-label="clearSearchButton"
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
