import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [queryValue, setQueryValue] = useState('');

  const handleInputClear = () => {
    setQueryValue('');
    dispatch(setQuery(''));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => dispatch(setStatus(e.target.value))}
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
          onChange={e => handleQueryChange(e)}
          value={queryValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {queryValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
