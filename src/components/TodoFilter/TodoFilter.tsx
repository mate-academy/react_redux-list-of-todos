import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';

type Props = {
  setStatusSelect: (item: string) => void;
  // setQuery: (item: string) => void;
  // query: string;
};

export const TodoFilter: React.FC<Props> = ({
  setStatusSelect,
  // setQuery,
  // query,
}) => {
  const [query, setQuery] = useState<string>('');

  const dispatch = useDispatch();

  // dispatch(actions.setActiveStatus)

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusSelect(event.target.value);
    // dispatch(actions.setActiveStatus(event.target.value));
    switch (event.target.value) {
      case 'completed':
        return dispatch(actions.setCompletedStatus(event.target.value));
      case 'active':
        return dispatch(actions.setActiveStatus(event.target.value));
        // походу нужен екшен и для ол чтобы это можно было задиспачить
      default:
        return event.target.value;
    }
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearSearchBar = () => {
    setQuery('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelect}>
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
          onChange={handleQuery}
          value={query}
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
              onClick={clearSearchBar}
            />
          </span>
        )}
      </p>
    </form>
  );
};
