import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { debounce } from '../../helpers/debounce';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [enteredQuery, setEnteredQuery] = useState('');

  const { status } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  const setFilterQuery = (query: string) => {
    return dispatch(filterActions.setQueryAction(query));
  };

  const applyQuery = useCallback(debounce(setFilterQuery, 500), []);

  const handleChangeFilterQuery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Status.ALL:
        dispatch(filterActions.setStatusAction(Status.ALL));
        break;

      case Status.ACTIVE:
        dispatch(filterActions.setStatusAction(Status.ACTIVE));
        break;

      case Status.COMPLETED:
        dispatch(filterActions.setStatusAction(Status.COMPLETED));
        break;

      default:
        break;
    }
  };

  const handleClickResetFilterQuery = () => {
    setEnteredQuery('');
    dispatch(filterActions.setQueryAction(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
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
};
