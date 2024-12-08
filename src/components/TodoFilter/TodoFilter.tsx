import React, { useEffect, useState } from 'react';
import { FilterBy } from '../../types/FilterBy';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setFilterQuery, setFilterStatus } from '../../features/filter';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDebounce } from '../../hooks/useDebounce';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const { status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(query, 500);

  const selectValue = (value: FilterBy) => {
    dispatch(setFilterStatus(value));
  };

  const resetQuery = () => {
    setQuery('');
    dispatch(setFilterQuery(''));
  };

  useEffect(() => {
    dispatch(setFilterQuery(debouncedValue.toLowerCase()));
  }, [debouncedValue]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => selectValue(e.target.value as FilterBy)}
          >
            {Object.entries(FilterBy).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
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
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
