import React from 'react';
import { Filter } from '../../enum/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { sortByQuery, sortByStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, status } = useSelector((state: RootState) => state.filter);

  const handlerQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(sortByQuery(value));
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Filter;

    dispatch(sortByStatus(value));
  };

  const handleClearQuery = () => {
    dispatch(sortByQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatus} value={status}>
            {Object.values(Filter).map(filterName => (
              <option key={filterName} value={filterName}>
                {filterName}
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
          value={query}
          onChange={handlerQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length !== 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleClearQuery()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
