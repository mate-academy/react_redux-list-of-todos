import React from 'react';
import { SelectedOptions } from '../../types/SelectedOptions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();

  const { query } = useAppSelector(state => state.filter);
  const { status } = useAppSelector(state => state.filter);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  const onButtonDelete = () => dispatch(filterActions.setQuery(''));

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setOption(event.target.value as SelectedOptions));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleOptionChange}
          >
            <option value={SelectedOptions.all}>All</option>
            <option value={SelectedOptions.active}>Active</option>
            <option value={SelectedOptions.completed}>Completed</option>
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onButtonDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
