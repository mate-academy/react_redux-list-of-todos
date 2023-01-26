import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setFilterTypeAction, setQueryAction } from '../../features/filter';
import { FilterStatus } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilterStatus = event.currentTarget.value;

    dispatch(setFilterTypeAction(selectedFilterStatus));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQueryAction(event.target.value));
  };

  const handleOnClear = () => {
    dispatch(setQueryAction(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={e => handleFormSubmit(e)}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleFilterStatus(event)}
          >
            <option value={FilterStatus.All}>All</option>
            <option value={FilterStatus.Active}>Active</option>
            <option value={FilterStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event) => handleOnChange(event)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            aria-label="clear"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleOnClear}
          />
        </span>
      </p>
    </form>
  );
};
