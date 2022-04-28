import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeUserId, getUser } from '../../features/user/userSlice';
import { deleteTodo, getTodos } from '../../features/todos/todosSlice';

import './TodoList.scss';

enum TodoStatus {
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    todos,
    isTodosLoading,
    todosLoadingError,
  } = useAppSelector(store => store.todos);
  const { user, selectedUserId } = useAppSelector(store => store.user);

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const prepeareTodos = (): Todo[] => {
    const loweredTitle = title.toLowerCase();

    const filteredTodosByInput = todos.filter(todo => (
      todo.title.toLowerCase().includes(loweredTitle)
    ));

    switch (status) {
      case TodoStatus.Active:
        return filteredTodosByInput.filter(todo => !todo.completed);
      case TodoStatus.Completed:
        return filteredTodosByInput.filter(todo => todo.completed);

      default:
        return filteredTodosByInput;
    }
  };

  const prepearedTodos = prepeareTodos();

  const handleFilter = (event: FilterEvent) => {
    const { name, value } = event.target;

    dispatch(changeUserId(null));

    switch (name) {
      case 'title':
        setTitle(value);
        break;

      case 'status':
        setStatus(value);
        break;

      default:
    }
  };

  const handleSelectUser = async (userId: number) => {
    if (selectedUserId !== userId) {
      await dispatch(getUser(userId));
    }

    dispatch(changeUserId(userId));
  };

  const handleRemoveTodo = async (todoId: number) => {
    await dispatch(deleteTodo(todoId));
    await dispatch(getTodos());
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div>
        {(!todosLoadingError && !isTodosLoading) && (
          <>
            <input
              type="text"
              onChange={handleFilter}
              placeholder="filter the todos by title"
              name="title"
            />

            <select
              id="select"
              onChange={handleFilter}
              value={status}
              name="status"
            >
              <option value="all">
                All
              </option>

              <option value="active">
                Active
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

            <div className="TodoList__list-container">
              <ul className="TodoList__list">
                {
                  prepearedTodos.map(todo => (
                    <li
                      className={classNames(
                        'TodoList__item',
                        {
                          'TodoList__item--unchecked': !todo.completed,
                          'TodoList__item--checked': todo.completed,
                        },
                      )}
                      key={todo.id}
                    >
                      <label htmlFor={`${todo.id}`}>
                        <input
                          id={`${todo.id}`}
                          type="checkbox"
                          readOnly
                          checked={todo.completed}
                        />
                        <p>{todo.title}</p>
                      </label>
                      <div className="TodoList__user-buttonContainer">
                        <button
                          className="TodoList__user-button button"
                          type="button"
                          onClick={() => handleRemoveTodo(todo.id)}
                        >
                          Delete
                        </button>

                        <button
                          className={classNames(
                            'TodoList__user-button',
                            'button',
                            {
                              'TodoList__user-button--selected':
                              todo.userId === user?.id,
                            },
                          )}
                          type="button"
                          onClick={() => handleSelectUser(todo.userId)}
                        >
                          {`User #${todo.userId}`}
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </>
        )}

        {todosLoadingError && !isTodosLoading && (
          'Unable to load the data'
        )}

        {isTodosLoading && (
          'Loading...'
        )}
      </div>
    </div>
  );
};
