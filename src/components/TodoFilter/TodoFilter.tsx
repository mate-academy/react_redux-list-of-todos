import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const TodoFilter:React.FC = () => {
  const reduxQuery = useSelector((state: RootState) => state.filter.query);
  const reduxStatus = useSelector((state: RootState) => state.filter.query);
  const dispatch = useDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            name="filterGoods"
            value={reduxStatus}
            data-cy="statusSelect"
            onChange={(event) => dispatch({
              type: 'filter/set-status', payload: event.target.value,
            })}
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
          value={reduxQuery}
          onChange={(event) => dispatch({
            type: 'filter/set-query', payload: event.target.value,
          })}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {reduxQuery !== '' && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onChange={() => dispatch({
                type: 'filter/set-query', payload: '',
              })}
            />
          )}
        </span>
      </p>
    </form>
  );
};
