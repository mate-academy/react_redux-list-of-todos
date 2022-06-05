import React, { useCallback, useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/TodoType';
import { actions, selectors } from '../../store';

export const TodoList: React.FC = () => {
  const todos = useSelector(selectors.loadTodos);
  const selectedUserId = useSelector(selectors.getUserId);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const dispatch = useDispatch();

  const handlerFilter = () => {
    const filteredTodos = todos.filter((selectedTodo) => {
      const conditionOfSelect = selectedTodo.title
        .toLowerCase().includes(query.trim().toLowerCase());

      if (query.trim() !== '' && status === 'all') {
        return conditionOfSelect;
      }

      if (status === 'completed') {
        return conditionOfSelect && selectedTodo.completed;
      }

      if (status === 'active') {
        return conditionOfSelect && !selectedTodo.completed;
      }

      return true;
    });

    setVisibleTodos(filteredTodos);
  };

  const deleterTodoByUserId = useCallback((id: number) => {
    dispatch(actions.deleteTodo(id));
  }, []);

  const handleUserId = useCallback((userId: number) => {
    dispatch(actions.selectUser(userId));
  }, []);

  useEffect(() => {
    setVisibleTodos(todos);
    handlerFilter();
  }, [todos, query, status]);

  return (
    <div className="TodoList">
      <h2>
        Todos:&nbsp;
        {visibleTodos.length}
        &nbsp;from&nbsp;
        {todos.length}
      </h2>
      <div className="TodoList__inputs-group">
        <div className="TodoList__inputs">
          <input
            className="TodoList__input"
            data-cy="filterByTitle"
            type="text"
            name="title"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <p className="TodoList__input-name">
            Search a case
          </p>
        </div>
        <div className="TodoList__inputs">
          <select
            className="TodoList__input
            TodoList__input--select"
            name="status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option value="all">
              Demonstrate all
            </option>
            <option value="active">
              Demonstrate active
            </option>
            <option value="completed">
              Demonstrate completed
            </option>
          </select>
          <p className="TodoList__input-name">
            Select status
          </p>
        </div>
      </div>
      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map((todo) => (
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
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              {todo.userId && (
                <div className="TodoList__buttons">
                  <button
                    type="button"
                    data-cy="userButton"
                    onClick={() => handleUserId(Number(todo.userId))}
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      {
                        'TodoList__user-button--selected':
                          selectedUserId === Number(todo.userId),
                      },
                    )}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleterTodoByUserId(Number(todo.id))}
                    className={classNames(
                      'TodoList__todo-button',
                      {
                        'TodoList__todo-button--selected':
                          selectedUserId === Number(todo.userId),
                      },
                    )}
                  >
                    DELETE
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
