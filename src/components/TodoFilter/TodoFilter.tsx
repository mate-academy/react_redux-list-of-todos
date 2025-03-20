import { ChangeEvent } from 'react';
import { StatusTodo } from '../../types/StatusTodo';
import React from 'react';

type Props = {
  selectedStatus: StatusTodo;
  setSelectedStatus: (status: StatusTodo) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectedStatus,
  setSelectedStatus,
  query,
  setQuery,
}: Props) => {
  const filterOptions = Object.entries(StatusTodo);
  const handleOnChangeSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as StatusTodo);
  };

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const reset = () => {
    setQuery('');
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
            value={selectedStatus}
            onChange={handleOnChangeSelected}
          >
            {filterOptions.map(option => {
              const [optionKey, optionValue] = option;

              return (
                <option key={optionKey} value={optionValue}>
                  {optionKey}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleOnChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
