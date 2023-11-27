/* eslint-disable max-len */
import React, { useState } from 'react';
import { Filter } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [isClear, setIsClear] = useState(false);
  const filter = useAppSelector((state) => state.filter.status);
  const searchText = useAppSelector((state) => state.filter.query);
  const dispatch = useAppDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => dispatch(actions.setFilter(e.target.value as Filter))}
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
          value={searchText}
          onChange={(e) => {
            dispatch(actions.setSearchText(e.target.value));
            if (e.target.value !== '') {
              setIsClear(true);
            } else {
              setIsClear(false);
            }
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {isClear && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(actions.setSearchText(''));
                setIsClear(false);
              }}
              aria-label="Clear Search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
