import React, { useEffect, useState } from 'react';

type Props = {
  getInput: (searchInput: string, typeSelect: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ getInput }) => {
  const [searchInput, setSearchInput] = useState('');
  const [typeSelect, setTypeSelect] = useState('all');

  useEffect(() => {
    getInput(searchInput, typeSelect);
  }, [searchInput, typeSelect]);

  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={typeSelect}
              onChange={(event) => {
                setTypeSelect(event.target.value);
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
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {searchInput && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setSearchInput('');
                }}
              />
            )}
          </span>
        </p>
      </form>
    </>
  );
};
