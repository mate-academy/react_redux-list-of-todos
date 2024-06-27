import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { filterSlice } from '../../features/filter';
import debounce from 'lodash.debounce';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const debouncedSetSearchWith = useCallback(
    debounce(newValue => {
      dispatch(filterSlice.actions.setQuery(newValue.trim()));
    }, 1000),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchWith.cancel();
    };
  }, [debouncedSetSearchWith]);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.setStatus(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSetSearchWith(event.target.value);
  };

  const handleClearInput = () => {
    setQuery('');
    dispatch(filterSlice.actions.setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select" onChange={handleSelect}>
          <select data-cy="statusSelect">
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
          onChange={handleInputChange}
          value={query}
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
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
