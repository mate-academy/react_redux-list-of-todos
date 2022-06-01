import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getLoadedTodos,
  getSelectedUser,
  loadedTodos,
  selectedUser,
} from '../../store';
import './TodoList.scss';

type Props = {
  onShuffle: () => void;
  message: string;
};

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  onShuffle,
  message,
}) => {
  const dispatch = useDispatch();

  const todos = useSelector(getLoadedTodos);
  const selectedUserId = useSelector(getSelectedUser);

  const handleUserButtonClick = useCallback((userId: number) => {
    dispatch(selectedUser(userId));
  }, [selectedUserId]);

  const handleRemoveButtonClick = useCallback((id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    dispatch(loadedTodos(updatedTodos));
  }, [todos]);

  const [titleQuery, setTitleQuery] = useState('');
  const [filterByStatus, setFilterByStatus] = useState(Status.All);

  const filteredTodos = todos.filter((todo) => {
    const isQuery = todo.title.toLowerCase()
      .includes(titleQuery.toLowerCase());

    switch (filterByStatus) {
      case Status.All:
        return isQuery;

      case Status.Active:
        return isQuery && !todo.completed;

      case Status.Completed:
        return isQuery && todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__controls">
        <label>
          Search:
          <input
            className="TodoList__inputs"
            type="text"
            value={titleQuery}
            onChange={({ target }) => {
              setTitleQuery(target.value);
            }}
            data-cy="filterByTitle"
          />
        </label>

        <label>
          Show:
          <select
            className="TodoList__inputs"
            value={filterByStatus}
            onChange={({ target }) => {
              setFilterByStatus(target.value as Status);
            }}
          >
            <option value={Status.All}>all</option>
            <option value={Status.Active}>active</option>
            <option value={Status.Completed}>completed</option>
          </select>
        </label>

        <button
          type="button"
          className="button"
          onClick={() => onShuffle()}
        >
          Randomize
        </button>
      </div>
      {message
        ? (
          <div className="TodoList__message">
            {message}
          </div>
        )
        : (
          <div className="TodoList__list-container">
            <ul className="TodoList__list" data-cy="listOfTodos">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item ',
                    { 'TodoList__item--unchecked': !todo.completed },
                    { 'TodoList__item--checked': todo.completed },
                  )}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>
                  <div className="TodoList__user-buttons">
                    {todo.userId && (
                      <button
                        className={classNames(
                          'TodoList__user-button',
                          'button',
                          {
                            'TodoList__user-button--selected':
                              selectedUserId === todo.userId,
                          },
                        )}
                        type="button"
                        onClick={() => handleUserButtonClick(todo.userId)}
                        data-cy="userButton"
                      >
                        User&nbsp;
                        {todo.userId}
                      </button>
                    )}
                    {!todo.userId && (
                      <button
                        className="button"
                        type="button"
                        data-cy="userButton"
                        disabled
                      >
                        No user
                      </button>
                    )}
                    <button
                      className="button button--remove"
                      type="button"
                      onClick={() => handleRemoveButtonClick(todo.id)}
                      data-cy="userButton"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
