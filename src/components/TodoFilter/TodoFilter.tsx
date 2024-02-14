import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');

  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value.toLowerCase().trim();

    setQuery(e.target.value);
    dispatch(actions.setFilter({ ...filter, title: inputQuery }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setFilter({ ...filter, status: e.target.value }));
  };

  const handleClick = () => {
    setQuery('');
    dispatch(actions.setFilter({ ...filter, title: '' }));
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
            onChange={handleSelectChange}
          >
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ cursor: 'pointer' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          )}

        </span>
      </p>
    </form>
  );
};
