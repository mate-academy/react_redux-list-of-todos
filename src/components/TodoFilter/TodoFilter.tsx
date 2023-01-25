import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { FilterStatusType } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');

  const filterParams = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const setFilterQuery = (newQuery: string) => {
    dispatch(filterActions.setQuery(newQuery));
  };

  const debouncedSetFilterQuery = useCallback(
    debounce(setFilterQuery, 300),
    [],
  );

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
    debouncedSetFilterQuery(event.currentTarget.value);
  };

  const handleQueryClear = () => {
    setQuery('');
    debouncedSetFilterQuery('');
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.currentTarget;

    switch (value) {
      case FilterStatusType.all:
        dispatch(filterActions.setStatus(FilterStatusType.all));
        break;
      case FilterStatusType.active:
        dispatch(filterActions.setStatus(FilterStatusType.active));
        break;
      case FilterStatusType.completed:
        dispatch(filterActions.setStatus(FilterStatusType.completed));
        break;
      default:
        break;
    }
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
            value={filterParams.status}
            onChange={handleSelectChange}
          >
            <option value={FilterStatusType.all}>All</option>
            <option value={FilterStatusType.active}>Active</option>
            <option value={FilterStatusType.completed}>Completed</option>
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
          onChange={handleQueryInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleQueryClear}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
