import React, { ChangeEvent, useMemo } from 'react';
import { firstLetterUpperCase } from '../../utils/halper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { TodosSortField } from '../../utils/const';
import { SelectOption } from '../../types/select';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const statusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as TodosSortField));
  };

  const searchQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const deleteSearchQuery = () => {
    dispatch(setQuery(''));
  };

  const options = useMemo<SelectOption<TodosSortField>[]>(
    () => [
      {
        value: TodosSortField.ALL,
        content: firstLetterUpperCase(TodosSortField.ALL),
      },
      {
        value: TodosSortField.ACTIVE,
        content: firstLetterUpperCase(TodosSortField.ACTIVE),
      },
      {
        value: TodosSortField.COMPLETED,
        content: firstLetterUpperCase(TodosSortField.COMPLETED),
      },
    ],
    [],
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={statusHandler}
          >
            {options.map(({ value, content }) => (
              <option key={value} value={value}>
                {content}
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
          onChange={searchQueryHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteSearchQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
