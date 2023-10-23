import React from 'react';
import { SortType } from '../../types/SortType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { query: value } = useAppSelector(state => state.filter);

  const handleDeleteClick = () => dispatch(actions.changeQueryAction(''));
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeQueryAction(event.target.value));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.changeStatusAction(event.target.value as SortType));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!value.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteClick}
            />
          </span>
        )}
      </p>
    </form>
  );
});
