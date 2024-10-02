import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import { setFilter, setQuery } from '../../features/filter';
import { Status } from '../../types/Status';
import debounce from 'lodash/debounce';

export const TodoFilter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as Status));
  };

  const handleClearSearch = () => {
    setInputValue('');
    dispatch(setQuery(''));
    debouncedSetQuery.cancel();
  };

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      dispatch(setQuery(value));
    }, 300),
    [dispatch],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
    debouncedSetQuery(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleSelect}
          >
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
          value={inputValue}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
