import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [selectValue, setSelectValue] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const filter = useAppSelector(state => state.filter);
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
            value={selectValue}
            onChange={(e) => {
              setSelectValue(e.currentTarget.value);

              if (e.currentTarget.value === 'ALL') {
                dispatch(filterActions.setFilter('ALL', inputValue));
              }

              if (e.currentTarget.value === 'ACTIVE') {
                dispatch(filterActions.setFilter('ACTIVE', inputValue));
              }

              if (e.currentTarget.value === 'COMPLETED') {
                dispatch(filterActions.setFilter('COMPLETED', inputValue));
              }
            }}
          >
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
            dispatch(filterActions
              .setQuery(e.currentTarget.value, filter.status));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue.length > 0
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setInputValue('');
                  dispatch(filterActions.setFilter(selectValue, inputValue));
                }}
              />
            </span>
          )}

      </p>
    </form>
  );
};
