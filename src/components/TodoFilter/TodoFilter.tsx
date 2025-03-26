import React from 'react';
import { Status, StatusType } from '../../types/Status';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const showOptions = Object.values(StatusType).map(stat => (
    <option key={stat} value={stat}>
      {stat[0].toUpperCase() + stat.slice(1)}
    </option>
  ));

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Status));
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleClearSearch = () => {
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
            value={status}
            onChange={handleChangeStatus}
          >
            {showOptions}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleChangeSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
