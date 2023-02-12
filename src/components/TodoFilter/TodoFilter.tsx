import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { setQuery, setStatus } = actions;
  const [localQuery, setLocalQuery] = useState('');
  const statuses: { name: string, value: Status }[] = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Completed', value: 'completed' },
  ];

  const debouncedQuery = debounce((value) => {
    dispatch(setQuery(value));
  }, 500);

  const queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
    debouncedQuery(event.target.value);
  };

  const clearSearchHandler = () => {
    setLocalQuery('');
    dispatch(setQuery(''));
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
            onChange={(event) => {
              dispatch(setStatus(event.target.value as Status));
            }}
          >
            {statuses.map(status => (
              <option
                key={status.name}
                value={status.value}
              >
                {status.name}
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
          onChange={queryHandler}
          value={localQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {localQuery.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              onClick={clearSearchHandler}
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
