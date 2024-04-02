import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/filter';

type Props = {
  query: string;
  completed: string;
};

export const TodoFilter: React.FC<Props> = ({ query, completed }) => {
  const dispatch = useDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={completed}
            onChange={e => dispatch(actions.setStatus(e.target.value))}
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
          onChange={e => dispatch(actions.setQuery(e.target.value))}
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
            />
          </span>
        )}
      </p>
    </form>
  );
};
