import React from 'react';
import { useDispatch } from 'react-redux';

import { filterActions } from '../../features/filter';
import { isStatus, STATUS_TYPES } from '../../types/Status';
import capitalizeString from '../../utils/capitalizeString';
import useAppSelector from '../../hooks/useAppSelector';

export const TodoFilterBase: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);
  const { setQuery, setStatus, clearQuery } = filterActions;

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isStatus(e.target.value)) {
      dispatch(setStatus(e.target.value));
    }
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    dispatch(clearQuery());
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
            onChange={handleChangeStatus}
            value={filter.status}
          >
            {STATUS_TYPES.map(status => (
              <option value={status} key={status}>
                {capitalizeString(status)}
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
          onChange={handleChangeQuery}
          value={filter.query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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

export const TodoFilter = React.memo(TodoFilterBase);
