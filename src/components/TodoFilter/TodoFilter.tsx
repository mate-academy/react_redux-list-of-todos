import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.filter);
  const [uiQuery, setUiQuery] = useState('');

  const setQuery = (
    newQuery: string,
  ) => dispatch(filterActions.setQuery(newQuery));

  const removeQuery = () => {
    dispatch(filterActions.removeQuery());
    setUiQuery('');
  };

  const setStatus = (
    newStatus: Status,
  ) => dispatch(filterActions.setStatus(newStatus));

  const applyQuery = useCallback(
    debounce(setQuery, 300),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUiQuery(event.target.value);
    applyQuery(event.target.value);
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
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
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
          value={uiQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {uiQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
