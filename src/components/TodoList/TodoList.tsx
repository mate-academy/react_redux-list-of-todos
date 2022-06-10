import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getTodos,
  getStateUser,
  isRandom,
  getQuery,
  getFilter,
  actions,
} from '../../store';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const todos = useSelector(getTodos);
  const user = useSelector(getStateUser);
  const random = useSelector(isRandom);
  const query = useSelector(getQuery);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleUserIdClick = (id: number) => {
    dispatch(actions.loadUser(id));
  };

  const getVisibleTodos = () => {
    let filteredTodos = todos.filter(todo => todo.title
      .toLowerCase().includes(query));

    let newTodos = filteredTodos;

    switch (filter) {
      case 'active':
        newTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        newTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (random) {
      filteredTodos = newTodos
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    } else {
      filteredTodos = newTodos;
    }

    return filteredTodos;
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [random, filter, query, todos],
  );

  const handleDeleteClick = (todoId: number) => {
    dispatch(actions.deleteTodo(todoId));
  };

  return (
    <div className="TodoList">
      {visibleTodos.length > 0 ? (
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
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

                <div className="TodoList__buttons">
                  <button
                    className={classNames(
                      'TodoList__user-button button',
                      {
                        'TodoList__user-button--selected':
                          todo.userId === user.id,
                      },
                    )}
                    type="button"
                    onClick={() => handleUserIdClick(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'TodoList__user-button button',
                      'TodoList__user-button--delete',
                    )}
                    onClick={() => handleDeleteClick(todo.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="error-message">
          <p>No todos was found</p>
        </div>
      )}
    </div>
  );
};
