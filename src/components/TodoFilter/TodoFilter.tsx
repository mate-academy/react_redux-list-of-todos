import React, { useEffect, useState } from 'react';
import { actions } from '../../features/filter';
import { useAppDispatch } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const [value, setValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const {
    setStatusActive,
    setStatusAll,
    setStatusCompleted,
    getQuery,
  } = actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (value) {
      case 'active':
        dispatch(setStatusActive());
        break;

      case 'completed':
        dispatch(setStatusCompleted());
        break;

      default:
        dispatch(setStatusAll());
        break;
    }
  }, [value, dispatch, setStatusActive, setStatusAll, setStatusCompleted]);

  useEffect(() => {
    dispatch(getQuery(searchValue));
  }, [getQuery, searchValue, dispatch]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setValue(event.target.value)}
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
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchValue
            && (
              <button
                aria-label="delete query"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearchValue('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
