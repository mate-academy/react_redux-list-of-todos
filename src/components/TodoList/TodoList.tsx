import React, { useState } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [listOfTodos, setListOfTodos] = useState('');
  const [statusOfTodo, setStatusOfTodo] = useState('all');

  const filterTodosByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListOfTodos(event.target.value);
  };

  const changeStatusOfTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusOfTodo(event.target.value);
  };

  const preparingTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      const titleInLowerCase = title.toLowerCase();

      return titleInLowerCase.includes(listOfTodos.toLowerCase());
    });

    switch (statusOfTodo) {
      case 'active (not completed)':
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case 'completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = preparingTodos();

  const dispatch = useDispatch();

  const delTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="TodoList">
      <div className="TodoList__navigation">
        <h2>
          Todos:
        </h2>
        <h3>
          Filter todo by title:
        </h3>
        <label>
          <input
            type="text"
            className="TodoList__navigationInput"
            value={listOfTodos}
            onChange={filterTodosByTitle}
            data-cy="filterByTitle"
          />
        </label>

        <h3>
          Select todo status:
        </h3>
        <select
          value={statusOfTodo}
          onChange={changeStatusOfTodo}
        >
          <option>all</option>
          <option>active (not completed)</option>
          <option>completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {preparedTodos.map(({
            userId,
            id,
            title,
            completed,
          }) => (
            <li
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
              key={id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              <div className="TodoList__actions">
                <button
                  type="button"
                  className={classnames(
                    'button',
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected':
                      selectedUserId === userId,
                    },
                  )}
                  onClick={() => selectUser(userId)}
                  data-cy="userButton"
                >
                  {`User ${userId}`}
                </button>

                <button
                  type="button"
                  className="button TodoList__delete-button"
                  onClick={() => delTodo(id)}
                >
                  delete TODO
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
