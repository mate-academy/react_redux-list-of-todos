import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { FILTER_SELECTORS } from '../../app/selectors';
import { FILTER_ACTION_CREATORS } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(FILTER_SELECTORS.query);
  const status = useAppSelector(FILTER_SELECTORS.status);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(FILTER_ACTION_CREATORS.setStatus(event.target.value));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(FILTER_ACTION_CREATORS.setQuery(event.target.value));
  };

  const handleClearButton = () => {
    dispatch(FILTER_ACTION_CREATORS.removeQuery());
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
            onChange={handleSelectChange}
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
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
