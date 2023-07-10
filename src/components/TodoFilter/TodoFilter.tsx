import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectValues } from '../../types/SelectValues';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const setFilterStatus = (status: string) => dispatch(actions
    .filterSelect(status));
  const setFilterQuery = (query: string) => dispatch(actions
    .searchingFilter(query));
  const clearSearch = () => dispatch((actions.searchingFilterClear()));
  const filterState = useAppSelector(state => state.filter);
  const { query, status } = filterState;
  const handlerChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const handlerChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value);
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
            onChange={handlerChangeSelect}
          >
            {
              Object.entries(SelectValues).map(([key, value]) => (
                <option
                  key={key}
                  value={value}
                >
                  {key}
                </option>
              ))
            }
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query || ''}
          onChange={handlerChangeSearch}
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
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
