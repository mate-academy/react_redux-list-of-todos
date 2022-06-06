import classNames from 'classnames';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadUser, removeTodo, setVisibileFilter, toggleCompleted,
} from '../../store/actions';
import { RootState } from '../../store/store';
import { FilterTypes } from '../../store/types';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState('');

  const todos: Todo[] = useSelector(
    (state: RootState) => state.reducer.todos,
  );

  const visibleFilter = useSelector(
    (state: RootState) => state.reducer.visibilityFilter,
  );

  const currentUser = useSelector(
    (state: RootState) => state.reducer.currentUser,
  );

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const filteredTodos = todo.title.toLowerCase().includes(searchTitle);

      switch (visibleFilter) {
        case FilterTypes.SHOW_ALL:
          return filteredTodos;

        case FilterTypes.SHOW_COMPLETED:
          return filteredTodos && todo.completed;

        case FilterTypes.SHOW_ACTIVE:

          return filteredTodos && !todo.completed;

        default:
          return filteredTodos;
      }
    });
  }, [visibleFilter, todos, searchTitle]);

  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(setVisibileFilter(event.target.value));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTitle(event.target.value);
  };

  const handleCheckbox = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  const selectUser = (id: number) => {
    dispatch(loadUser(id));
  };

  return (
    <div className="Todo-list">
      <h2>Todos:</h2>

      <div className="Todo-list__control">
        <label className="Todo-list__filter-by-title Todo-list__input-label">
          <input
            type="text"
            placeholder="Filter by title"
            className="Todo-list__input"
            value={searchTitle}
            onChange={handleInputChange}
          />
        </label>

        <select
          className="Todo-list__filter-by-completed Todo-list__select"
          value={visibleFilter}
          onChange={handleSelectChange}
        >
          <option value={FilterTypes.SHOW_ALL}>All</option>
          <option value={FilterTypes.SHOW_ACTIVE}>Active</option>
          <option value={FilterTypes.SHOW_COMPLETED}>Completed</option>
        </select>

        <ul className="Todo-list__list" data-cy="listOfTodos">
          {!!visibleTodos.length && visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'Todo-list__item',
                { 'Todo-list__item--checked': todo.completed },
                { 'Todo-list__item--unchecked': !todo.completed },
              )}
            >
              <div className="Todo-list__todo">
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckbox(todo.id)}
                  />
                  <p className="Todo-list__todo-title">{todo.title}</p>
                </label>
              </div>
              <div className="Todo-list__buttons">
                {todo.userId && (
                  <button
                    className={classNames(
                      'Todo-list__user-button',
                      'Todo-list__button',
                      {
                        'Todo-list__user-button--selected':
                          currentUser && currentUser.id === todo.userId,
                      })}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                )}
                <button
                  type="button"
                  className="Todo-list__button button-x"
                  onClick={() => handleDelete(todo.id)}
                >
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
