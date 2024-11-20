import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { actions as filterActions } from '../../features/filter';

const ALL = 'all';
const ACTIVE = 'active';
const COMPLETED = 'completed';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.query(e.target.value));
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === ALL || value === ACTIVE || value === COMPLETED) {
      dispatch(filterActions.status(value));
    }
  };

  const onClick = () => {
    dispatch(filterActions.query(''));
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
            onChange={onSelectChange}
            value={status}
          >
            <option value={ALL}>All</option>
            <option value={ACTIVE}>Active</option>
            <option value={COMPLETED}>Completed</option>
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
          onChange={onInputChange}
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
              onClick={onClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
