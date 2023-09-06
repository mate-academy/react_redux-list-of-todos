import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const str = ev.target.value;

    dispatch(filterActions.setQuery(str));
  };

  const handleInputClear = () => dispatch(filterActions.clearQuery());

  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const statusToSet = ev.target.value as Status;

    dispatch(filterActions.setStatus(statusToSet as Status));
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
            onChange={handleSelectChange}
          >
            {Object.keys(Status).map(key => (
              <option key={key} value={key.toLowerCase()}>
                {key}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleInputClear}
          />
        </span>
      </p>
    </form>
  );
};
