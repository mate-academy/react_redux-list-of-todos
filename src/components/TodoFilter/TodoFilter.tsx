import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';
import debounce from 'lodash.debounce';

export const TodoFilter: React.FC = () => {
  const [localQuery, setLocalQuery] = useState('');
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const applyQuery = debounce((string: string) => {
    dispatch(setQuery(string));
  }, 300);

  const handleCloseButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setLocalQuery('');
      applyQuery('');
    },
    [applyQuery],
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.target.value);
    setLocalQuery(event.target.value);
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(setStatus(value as Status));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatus} value={status}>
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
          value={localQuery}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
