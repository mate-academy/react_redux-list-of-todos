import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actionsWithFilter, FilterMethods } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const { query } = useAppSelector(state => state.filter);

  const chooseOfFilterMethod = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case FilterMethods.ACTIVE:
        return dispatch(actionsWithFilter.active());

      case FilterMethods.COMPLETED:
        return dispatch(actionsWithFilter.completed());

      case FilterMethods.ALL:
      default:
        return dispatch(actionsWithFilter.all());
    }
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
            onChange={chooseOfFilterMethod}
          >
            <option value={FilterMethods.ALL}>All</option>
            <option value={FilterMethods.ACTIVE}>Active</option>
            <option value={FilterMethods.COMPLETED}>Completed</option>
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
          onChange={(event => {
            dispatch(actionsWithFilter.query(event.target.value));
          })}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actionsWithFilter.query(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
