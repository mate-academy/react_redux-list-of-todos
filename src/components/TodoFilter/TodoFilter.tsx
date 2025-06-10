import { useState } from 'react';

type StatusType = 'all' | 'active' | 'completed';

type Props = {
  doSearch: (query: string) => void;
  doSearchSelect: (value: StatusType) => void;
};

export const TodoFilter: React.FC<Props> = ({ doSearch, doSearchSelect }) => {
  const [valueInput, setValueInput] = useState('');

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            onChange={e => doSearchSelect(e.target.value as StatusType)}
            data-cy="statusSelect"
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
          value={valueInput}
          placeholder="Search..."
          onChange={e => {
            setValueInput(e.target.value);
            doSearch(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {valueInput && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              onClick={() => {
                doSearch('');
                setValueInput('');
              }}
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
