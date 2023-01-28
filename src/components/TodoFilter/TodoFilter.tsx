import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { debounce } from '../../helpers/debounce';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = React.memo(() => {
  const [enteredQuery, setEnteredQuery] = useState('');

  const { status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const setFilterQuery = (query: string) => (
    dispatch(filterActions.setFilterQuery(query))
  );

  const applyQuery = useCallback(debounce(setFilterQuery, 500), []);

  const handleChangeFilterQuery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleChangeStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case Status.ALL:
        dispatch(filterActions.setFilterStatus(Status.ALL));
        break;

      case Status.ACTIVE:
        dispatch(filterActions.setFilterStatus(Status.ACTIVE));
        break;

      case Status.COMPLETED:
        dispatch(filterActions.setFilterStatus(Status.COMPLETED));
        break;

      default:
        break;
    }
  };

  const handleClickResetFilterQuery = () => {
    setEnteredQuery('');
    dispatch(filterActions.setFilterQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={enteredQuery}
          onChange={handleChangeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {enteredQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClickResetFilterQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
});
