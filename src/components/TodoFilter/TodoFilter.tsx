import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Filter } from '../../types/Filter';
import { actions as FilterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [option, setOption] = useState<string>(Filter.ALL);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const filterQuery = useAppSelector(state => state.filter.query);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setOption(value);

    dispatch(FilterActions.setStatus(value));
  };

  const onChangeSearchHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setSearch(value);
    dispatch(FilterActions.setQuery(value));
  };

  const clearSearch = () => {
    setSearch('');
    dispatch(FilterActions.setQuery(''));
  };

  return (
    <form className="field has-addons">
      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={onChangeHandler}
          >
            <option value={Filter.ALL}>
              All
            </option>
            <option value={Filter.ACTIVE}>
              Active
            </option>
            <option value={Filter.COMPLETED}>
              Completed
            </option>
          </select>
        </div>
      </div>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={onChangeSearchHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
