import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Todo } from '../../store/todosStore';
import { actions as filtersActions } from '../../store/filtersStore';
import { selectors, actions } from '../../store/index';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number | null;
  onSelect: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  children,
  todos,
  selectedUserId,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const titleQuery = useSelector(selectors.getTitleQuery);
  const statusQuery = useSelector(selectors.getStatusQuery);

  const preparedTodos = todos
    .filter(
      ({ title }) => title.toLowerCase().includes(titleQuery),
    ).filter(
      ({ completed }) => {
        switch (statusQuery) {
          case 'active':
            return !completed;
          case 'completed':
            return completed;
          default:
            return true;
        }
      },
    );

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label>
        Search by title
        <input
          type="text"
          value={titleQuery}
          onChange={({ target }) => {
            dispatch(filtersActions.setQuery(target.value));
          }}
        />
      </label>
      &nbsp;
      <select
        value={statusQuery}
        onChange={(event) => {
          dispatch(filtersActions.setStatus(event.target.value));
        }}
      >
        <option value="">
          Select todos
        </option>
        <option
          value="all"
        >
          All
        </option>
        <option
          value="active"
        >
          Active
        </option>
        <option
          value="completed"
        >
          Completed
        </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {preparedTodos.map(({
            id, title, userId, completed,
          }) => (
            <li
              key={id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': completed,
                'TodoList__item--unchecked': !completed,
              })}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>
              <div>
                <button
                  className={classNames('TodoList__user-button', 'button', {
                    'button--selected':
                      userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => onSelect(userId)}
                >
                  User&nbsp;
                  {userId}
                </button>
                &nbsp;
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    dispatch(actions.deleteTodo(id));
                  }}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
          {children}
        </ul>
      </div>
    </div>
  );
};
