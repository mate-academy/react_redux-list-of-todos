import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodosAction, setUserAction,
} from '../../store/action';
import { getFilteredTodosSelector, getUserSelector }
  from '../../store/selectors';
import { getUsers, getTodos, deleteTodoFromServer } from '../../api/api';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const userSelector = useSelector(getUserSelector);

  const filteredTodos = async () => {
    const todosFromServer = await getTodos();

    dispatch(setTodosAction(todosFromServer));
  };

  useEffect(() => {
    filteredTodos();
  }, []);

  const clickSelectUser = async (userId: number) => {
    const user = await getUsers(userId);

    dispatch(setUserAction(user));
  };

  const filterTitle = useSelector(getFilteredTodosSelector(title));

  function filter(prepareForFilterTodos: Todo[]) {
    switch (selectedValue) {
      case 'completed':
        return prepareForFilterTodos.filter(todo => todo.completed);
      case 'active':
        return prepareForFilterTodos.filter(todo => !todo.completed);
      default:
        return prepareForFilterTodos;
    }
  }

  const finishGoods = filter(filterTitle);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <h4>Filter by title</h4>
        <input
          data-cy="filterByTitle"
          type="text"
          value={title}
          className="TodoList__input"
          placeholder="Enter a title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}

        />
        <h4> Status:</h4>
        <select
          className="TodoList__input TodoList__input "
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          <option value="all"> All </option>
          <option value="active">Active </option>
          <option value="completed">Completed </option>
        </select>
        <ul className="TodoList__list" data-cy="listOfTodos">
          {finishGoods.map(todo => (
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
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <div>

                <button
                  data-cy="userButton"
                  className={classNames(
                    'TodoList__user-button', 'button',
                    {
                      'TodoList__user-button--selected':
                         userSelector?.id === todo.userId,
                    },
                  )}
                  type="button"
                  onClick={() => {
                    clickSelectUser(todo.userId);
                  }}
                >
                  {`User# ${todo.userId}`}
                </button>

                <button
                  className="button"
                  type="button"
                  onClick={async () => {
                    await deleteTodoFromServer(todo.id);
                    filteredTodos();
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
