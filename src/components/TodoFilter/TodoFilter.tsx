import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setSortType: React.Dispatch<React.SetStateAction<SortType>>,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  value,
  setValue,
  setSortType,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedInput = event.target.value;

    setValue(normalizedInput);
  };

  const handleDeleteClick = () => setValue('');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value as SortType);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!value.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteClick}
            />
          </span>
        )}
      </p>
    </form>
  );
});
