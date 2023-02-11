import React from 'react';
import { Status } from '../../types/Status';
import { actions } from '../../features/filter';

import { useAppDispatch } from '../../app/hooks';

type Props = {
  query: string;
  status: string;
};

export const TodoFilter: React.FC<Props> = ({ query, status }) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(actions.setQuery(value));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(event.target.value as Status));
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
              aria-label="clear button"
            />
          </span>
        )}
      </p>
    </form>
  );
};
