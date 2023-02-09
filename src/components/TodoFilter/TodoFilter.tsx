import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setFilterType, setQueryAction } from '../../features/filter';
import { FilterOptions } from '../../types/Filter';

export const TodoFilter: FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value;

    dispatch(setFilterType(selectedFilter));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQueryAction(e.target.value));
  };

  const handleClear = () => {
    dispatch(setQueryAction(''));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="field has-addons"
      onSubmit={e => handleSubmit(e)}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => handleFilterStatus(e)}
          >
            <option value={FilterOptions.All}>All</option>
            <option value={FilterOptions.Active}>Active</option>
            <option value={FilterOptions.Completed}>Completed</option>
          </select>
        </span>
      </p>
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(e) => handleChange(e)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                aria-label="clear"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClear}
              />
            </span>
          )}
      </p>
    </form>
  );
};
