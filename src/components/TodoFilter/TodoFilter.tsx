import { useDispatch, useSelector } from 'react-redux';
import { FilterTypes } from '../../types/FilterTypes';
import './TodoFilter.scss';
import { AppDispatch, RootState } from '../../app/store';
import { setFilterType, setQuery } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.filter.query);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterType(e.target.value as FilterTypes));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          onChange={event => dispatch(setQuery(event.target.value as string))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right pointer-all">
          {query.length !== 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
