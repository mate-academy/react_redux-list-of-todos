import { Filter } from '../../types/Filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.toLowerCase();

    switch (value) {
      case Filter.Active.toLowerCase():
        dispatch(filterSlice.actions.setFilter(Filter.Active));
        break;
      case Filter.Completed.toLowerCase():
        dispatch(filterSlice.actions.setFilter(Filter.Completed));
        break;
      default:
        dispatch(filterSlice.actions.setFilter(Filter.All));
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    dispatch(filterSlice.actions.setQuery(input));
  };

  const handleDelete = () => {
    dispatch(filterSlice.actions.setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
            <option value="all">{Filter.All}</option>
            <option value="active">{Filter.Active}</option>
            <option value="completed">{Filter.Completed}</option>
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
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
