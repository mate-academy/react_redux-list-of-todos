import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  ActiveTodos,
  AllTodos,
  CompletedTodos,
  Filter,
  Query,
} from '../../features/filter';
import { useDispatch } from 'react-redux';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [inputQuery, setInputQuery] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
    dispatch(Query(inputQuery));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(Filter(e.target.value, e.target.value));
  };

  useEffect(() => {
    dispatch(Filter(AllTodos, AllTodos));
  });

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            defaultValue={AllTodos}
          >
            <option value={AllTodos}>All</option>
            <option value={ActiveTodos}>Active</option>
            <option value={CompletedTodos}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputQuery}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
