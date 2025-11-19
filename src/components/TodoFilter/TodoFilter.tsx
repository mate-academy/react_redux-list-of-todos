import React from 'react';
import { useDispatch } from 'react-redux';
import { Status, pairStatus } from '../../types/Status';
import { filterSlice } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);

  const selectStatus = (value: Status) =>
    dispatch(filterSlice.actions.setStatus(value));

  const searchInput = (value: string) =>
    dispatch(filterSlice.actions.setQuery(value));

  const crearInput = () => dispatch(filterSlice.actions.setQuery(''));

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={e => selectStatus(e.target.value as Status)}
          >
            {pairStatus.map(({ key, value }, i) => (
              <option key={i} value={key}>
                {value}
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
          onChange={e => searchInput(e.target.value)}
          value={filter.query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={crearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
