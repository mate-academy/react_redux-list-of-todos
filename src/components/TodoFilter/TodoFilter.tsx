import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import './TodoFilter.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { TimeLoader } from '../TimeLoader';

const DEBOUNCE_TIME = 500;

export const TodoFilter: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(inputQuery !== query);

    setTimeout(() => {
      setLoading(false);
    }, DEBOUNCE_TIME);
  }, [inputQuery, query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedQuery = useCallback(debounce(dispatch, DEBOUNCE_TIME), []);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputQuery(event.target.value);
    debouncedQuery(filterActions.query(event.target.value));
  }

  function clearQuery() {
    setInputQuery('');
    debouncedQuery(filterActions.query(''));
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(filterActions.status(event.target.value as Status));
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
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
          value={inputQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: Status.all }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <>
            {loading && (
              <div className="time-loader-wrapper">
                <TimeLoader />
              </div>
            )}

            {inputQuery && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearQuery}
                aria-label="delete query"
              />
            )}
          </>
        </span>
      </p>
    </form>
  );
};
