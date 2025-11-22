import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  clearFilterQuery,
  setFilterQuery,
  setFilterStatus,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [queryValue, setQueryValue] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    setQueryValue(newQuery);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      dispatch(setFilterQuery(newQuery));
    }, 1000);
  };

  const handleClearQuery = () => {
    dispatch(clearFilterQuery());
    setQueryValue('');
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
            onChange={e => dispatch(setFilterStatus(e.target.value))}
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
          value={queryValue}
          onChange={e => handleQuery(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {queryValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
