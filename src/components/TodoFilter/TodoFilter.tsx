import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearQuery, setQuery, setStatus } from '../../features/filter';
import { RootState } from '../../app/store';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector<RootState, Status>(
    state => state.filterSlice.status,
  );
  const query = useSelector<RootState, string>(
    state => state.filterSlice.query,
  );

  const handlerSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as Status));
  };

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value as Status));
  };

  const clearInputChange = () => {
    dispatch(clearQuery());
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
            onChange={handlerSelectChange}
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
          onChange={handlerInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInputChange}
            />
          </span>
        )}
      </p>
    </form>
  );
};
