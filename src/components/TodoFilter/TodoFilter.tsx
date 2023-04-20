import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [tempQuery, setTempQuery] = useState('');

  const dispatch = useAppDispatch();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    switch (value) {
      case Status.all:
        dispatch(filterActions.setStatusAll());
        break;

      case Status.active:
        dispatch(filterActions.setStatusActive());
        break;

      case Status.complited:
        dispatch(filterActions.setStatusComplited());
        break;

      default:
        throw new Error('Invalid filter status was passed');
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuery(e.target.value);
    dispatch(filterActions.setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    setTempQuery('');
    dispatch(filterActions.removeQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.complited}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={tempQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {tempQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="clearSearchButton"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
