/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  onChangeFilter: (event:React.ChangeEvent<HTMLSelectElement>) => void,
  statusFilter:string,
  input:string,
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  clearInput: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  onChangeFilter,
  input,
  onChangeInput,
  clearInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={onChangeFilter}
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
        onChange={onChangeInput}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {input && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearInput}
          />
        )}
      </span>
    </p>
  </form>
);
