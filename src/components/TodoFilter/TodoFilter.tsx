import { ChangeEvent } from 'react';

type Props = {
  searchValue: string;
  selectValue: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectInput: (event: ChangeEvent<HTMLSelectElement>) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    searchValue,
    selectValue,
    onSearchInput,
    onSelectInput,
    onClearSearch: clearSearch,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={onSelectInput}
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
          value={searchValue}
          onChange={onSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!searchValue.length
          && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
