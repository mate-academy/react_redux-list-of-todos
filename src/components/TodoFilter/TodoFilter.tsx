import React, { useEffect, useState } from 'react';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { setTodos } from '../../features/todos';

type Props = {
  list: Todo[],
};

export const TodoFilter: React.FC<Props> = ({ list }) => {
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const [resetIsClicked, setResetIsClicked] = useState(false);

  const selectedList = () => {
    switch (status) {
      case 'active':
        return list.filter(todo => todo.completed === false);
      case 'completed':
        return list.filter(todo => todo.completed === true);
      default:
        return list;
    }
  };

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement>
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(filterActions.setFilter(value as Status));
  };

  const modifiedList = selectedList().filter(todos => {
    return todos.title.toUpperCase().includes(query.toUpperCase());
  });

  useEffect(() => {
    dispatch(setTodos(modifiedList));
  }, [query, status]);

  const eraseInput = () => {
    setResetIsClicked(false);
    dispatch(filterActions.setQuery(''));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.setQuery(value));
    setResetIsClicked(true);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelect}
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
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {resetIsClicked && query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={eraseInput}
              />
            </span>
          )}
      </p>
    </form>
  );
};
