import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setQueryFilter } from '../../features/filter';

export const QueryFilter = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(setQueryFilter(inputValue));
  }, [inputValue, dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={inputValue}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={handleChange}
        aria-label="Search input"
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClear}
            aria-label="Clear search"
          />
        </span>
      )}
    </p>
  );
};
