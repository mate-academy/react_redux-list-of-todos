import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setQueryAction, setTypeAction } from '../../features/filter';
import { FilterTrigger } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleFilterTrigger = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilterTrigger = e.currentTarget.value;

    dispatch(setTypeAction(selectedFilterTrigger));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQueryAction(e.target.value));
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
            onChange={(e) => handleFilterTrigger(e)}
          >
            <option value={FilterTrigger.All}>All</option>
            <option value={FilterTrigger.Active}>Active</option>
            <option value={FilterTrigger.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(e) => handleOnChange(e)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="clear"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleOnClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
