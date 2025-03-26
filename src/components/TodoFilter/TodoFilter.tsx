import React from 'react';
import { setQuery, setState } from '../../features/filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { StatusType } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const selectValue = useSelector((state: RootState) => state.filter.status);
  const queryValue = useSelector((state: RootState) => state.filter.query);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    dispatch(setState(value as StatusType));
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(setQuery(value));
  };

  const handleClearQuery = () => {
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
            value={selectValue}
            onChange={handleSelect}
          >
            <option value={StatusType.All}>All</option>
            <option value={StatusType.Active}>Active</option>
            <option value={StatusType.Completed}>Completed</option>
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
          onChange={handleQuery}
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
