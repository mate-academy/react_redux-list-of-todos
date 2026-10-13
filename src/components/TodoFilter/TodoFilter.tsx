import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';
import debounce from 'lodash.debounce';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [tempQuery, setTempQuery] = useState(query);
  const setResidualQuery = useCallback(
    debounce(
      currentQuery => dispatch(filterSlice.actions.setQuery(currentQuery)),
      400,
    ),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      setResidualQuery.cancel();
    };
  }, [setResidualQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              dispatch(
                filterSlice.actions.setStatus(event.target.value as Status),
              )
            }
            value={status}
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
          onChange={event => {
            setTempQuery(event.target.value);
            setResidualQuery(event.target.value);
          }}
          value={tempQuery}
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
              onClick={() => {
                dispatch(filterSlice.actions.setQuery(''));
                setTempQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
