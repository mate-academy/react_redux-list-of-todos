/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import './TodoList.scss';
import { setTodosAction, setUserAction } from '../../store/actions';
import {
  getTodosSelector, getUserSelector, Select,
} from '../../store/selectors';
import { deleteTodoById, getTodos, getUserById } from '../../api/api';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Select>(Select.all);

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector(query, selected));

  const user = useSelector(getUserSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(setTodosAction(todosFromServer));
      } catch (error) {
        console.log(error);
      }
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    try {
      const userFromServer = await getUserById(id);

      dispatch(setUserAction(userFromServer));
    } catch (error) {
      console.log(error);
      dispatch(setUserAction(null));
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoById(id);

      const updatedTodos = await getTodos();

      dispatch(setTodosAction(updatedTodos));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <section>
        <input
          className="TodoList__input"
          data-cy="filterByTitle"
          type="text"
          placeholder="enter the todo`s title"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <select
          className="TodoList__select"
          onChange={(event) => {
            setSelected(event.target.value as Select);
          }}
        >
          <option
            value={Select.all}
          >
            Show all
          </option>
          <option
            value={Select.active}
          >
            Show active
          </option>
          <option
            value={Select.completed}
          >
            Show completed
          </option>
        </select>
      </section>

      <div className="TodoList__list-container">
        <ul data-cy="listOfTodos" className="TodoList__list">
          {todos.map(todo => (

            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              <div>
                <button
                  data-cy="userButton"
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                      todo.userId === user?.id,
                  })}
                  type="button"
                  onClick={() => {
                    getUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
                <button
                  type="button"
                  onClick={() => (
                    deleteTodo(todo.id)
                  )}
                  className="TodoList__button-delete button"
                >
                  X
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
