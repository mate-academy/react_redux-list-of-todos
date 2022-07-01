import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import store, { actions, selectors } from '../../store';
import { getUser, removeTodo } from '../../api/api';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const user = useSelector(selectors.getUser);

  const deleteTodo = (id: number) => {
    removeTodo(id).then(() => (
      store.dispatch(actions.setTodos(
        todos.filter(todo => todo.id !== id),
      ))
    ));
  };

  const setUser = (id: number) => {
    getUser(id).then((res) => store.dispatch(actions.setUser(res)));
  };

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">
        <h2>Todos:</h2>
        {todos.length > 0 ? (
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <div className="TodoList__buttons">
                  <button
                    className={classNames(
                      'button',
                      'TodoList__button',
                      {
                        'button--active':
                          todo.userId === user?.id,
                      },
                    )}
                    type="button"
                    onClick={() => setUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                  <button
                    type="button"
                    className="button TodoList__button-remove"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    x
                  </button>
                </div>

              </li>
            ))}
          </ul>
        ) : (
          <p className="TodoList__warn-message">
            No todo with the specified title!
          </p>
        )}
      </div>
    </div>
  );
};
