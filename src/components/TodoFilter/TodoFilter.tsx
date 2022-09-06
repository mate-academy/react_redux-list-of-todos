import { FC, memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { actions as filterActions } from '../../store/filter';
import { FilterType } from '../../types/FilterType';
import { selectors } from '../../store';

export const TodoFilter: FC = memo(() => {
  const dispatch = useDispatch();
  const { filterType } = useSelector(selectors.getFilter);
  const [query, setQuery] = useState('');

  const setAppliedQuery = useDebouncedCallback((value) => {
    dispatch(filterActions.setAppliedQuery(value));
  }, 300);

  const handleChangeQuery = (value = '') => {
    setQuery(value);
    setAppliedQuery(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => {
              dispatch(
                filterActions.setFilterType(event.target.value as FilterType),
              );
            }}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
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
          onChange={(event) => handleChangeQuery(event.target.value)}
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
              onClick={() => handleChangeQuery()}
            />
          </span>
        )}
      </p>
    </form>
  );
});
