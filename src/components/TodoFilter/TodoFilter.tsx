import React, { useMemo, useState } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch } from '../../app/hooks';
import { filterSlice } from '../../features/filter';
import debounce from 'lodash/debounce';

type Props = {
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setQuery }) => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const applyTittle = useMemo(() => debounce(setQuery, 1000), [setQuery]);

  const setFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.setFilter(event.target.value as Status));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    applyTittle(event.target.value);
  };

  const handleOnClick = () => {
    setQuery('');
    setTitle('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={setFilter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={title}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleOnChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!title.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleOnClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
