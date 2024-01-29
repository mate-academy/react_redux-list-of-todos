import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [select, setSelect] = useState<Status>('all');
  const dispatch = useAppDispatch();
  const selectValue = useAppSelector(state => state.filter);

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;

    setSelect(value);

    switch (value) {
      case 'active':
        dispatch(filterActions.active());
        break;

      case 'completed':
        dispatch(filterActions.completed());
        break;

      default:
        dispatch(filterActions.all());
        break;
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.query(e.target.value));
  };

  const clearSearchHandler = () => {
    dispatch(filterActions.queryClear());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={selectHandler}
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
          onChange={searchHandler}
          value={selectValue.query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {selectValue.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchHandler}
            />
          </span>
        )}
      </p>
    </form>
  );
};
