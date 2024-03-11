import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(store => store.filter);
  const { query } = filter;

  const handleChage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(actions.SetActionStatus(value));
  };

  const hanleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(actions.setActionQuery(value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select onChange={handleChage} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          onChange={hanleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right is-events">
            <button
              aria-labelledby="clear button"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.clearAcrionQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
