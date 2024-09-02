import { useDispatch, useSelector } from 'react-redux';
import { FilterType } from '../../types/Filter';
import { AppDispatch, RootState } from '../../app/store';
import { changeQuery, changeStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useSelector((state: RootState) => state.filter.query);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case FilterType.All:
        dispatch(changeStatus(FilterType.All));

        break;
      case FilterType.Active:
        dispatch(changeStatus(FilterType.Active));

        break;
      default:
        dispatch(changeStatus(FilterType.Completed));
    }
  };

  const handleClearQuery = () => {
    dispatch(changeQuery(''));
  };

  const filterVar = [FilterType.All, FilterType.Active, FilterType.Completed];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            {filterVar.map(filterValue => (
              <option value={filterValue} key={filterValue}>
                {filterValue}
              </option>
            ))}
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
          onChange={event => dispatch(changeQuery(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
