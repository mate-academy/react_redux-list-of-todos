import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(actions.setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    setQuery('');
    dispatch(actions.setQuery(''));
  };

  const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;

    dispatch(actions.setStatus(target));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectStatus}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          onChange={handleChangeQuery}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              onClick={handleClearQuery}
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
