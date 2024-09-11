import React from 'react';
import { Status } from '../../types/Status';
import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addQuery, changeStatus, clearQuery } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const statusOptions = Object.entries(Status);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addQuery(event.target.value));
  };

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeStatus(event.target.value as Status));
  };

  const handleClearQuery = () => {
    dispatch(clearQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectStatus}>
            {statusOptions.map(([status, statusValue]) => (
              <option value={statusValue} key={status}>
                {status}
              </option>
            ))}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
