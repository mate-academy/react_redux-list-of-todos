import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';
import _debounce from 'lodash/debounce';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  /*eslint-disable react-hooks/exhaustive-deps*/
  const applyQuery = useCallback(
    _debounce((query: string) => {
      dispatch(actions.setQuery(query));
    }, 300),
    [dispatch],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setInputValue(val);
    applyQuery(val);
  };

  const handleClear = () => {
    setInputValue('');
    applyQuery('');
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
            onChange={event => {
              dispatch(actions.setStatus(event.target.value));
            }}
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
          value={inputValue}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleClear()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
