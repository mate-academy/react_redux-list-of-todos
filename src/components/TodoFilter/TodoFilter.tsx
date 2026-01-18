import React, { ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Status } from '../../types/Status';
import { changeStatus, setQuery } from '../../features/filter';
import { useAppSelector } from '../../hooks/useAppSelector';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Status;

    dispatch(changeStatus(status));
  };

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  };

  const options: Status[] = ['all', 'active', 'completed'];

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeStatus}>
            {options.map(op => (
              <option value={op} key={op}>
                {op[0].toUpperCase() + op.slice(1)}
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
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
