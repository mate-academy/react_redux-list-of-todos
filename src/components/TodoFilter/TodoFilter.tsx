import React, { ChangeEvent, useCallback, useState } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { debounceDispatchAction } from '../../helpers/debounce';

type Props = {
  selectValue: Status;
};

export const TodoFilter: React.FC<Props> = ({ selectValue }) => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const applyQuery = useCallback(
    debounceDispatchAction(dispatch, filterActions.setQuery, 300),
    [],
  );

  const onSetSelectStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(filterActions.setStatus(value as Status));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
    applyQuery(value);
  };

  const handleInputReset = () => {
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
            value={selectValue}
            onChange={onSetSelectStatus}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
