import React, { useState } from 'react';
import { filterSlice } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const { modifyQuery, modifyStatus } = filterSlice.actions;
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');
  const [select, setSelect] = useState('all');

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    dispatch(modifyQuery(event.target.value));
  };

  const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
    dispatch(modifyStatus(event.target.value as Status));
  };

  const clear = () => {
    setInput('');
    dispatch(modifyQuery(''));
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
            value={select}
            onChange={handleSelectValue}
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
          value={input}
          onChange={handleInputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => clear()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
