import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filtrationAction } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const queryHandler = () => {
    dispatch(filtrationAction.setQuery(input, selectedOption));
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const clearInputButton = () => {
    setInput('');
  };

  useEffect(() => {
    queryHandler();
  }, [input, selectHandler]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={selectHandler}>
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
          onChange={inputHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {input && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInputButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
