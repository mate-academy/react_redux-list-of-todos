/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoById, getTodos, getUserById } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [titleSubstring, setTitleSubstring] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  const filteredTodos = () => {
    const showTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(titleSubstring.toLowerCase());
    });

    switch (filterOption) {
      case 'active':
        return showTodos.filter(todo => todo.completed === false);
      case 'completed':
        return showTodos.filter(todo => todo.completed === true);
      default:
        return showTodos;
    }
  };

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

      <div>
        <div>
          <input
            className="form-control"
            data-cy="filterByTitle"
            type="text"
            placeholder="Enter a substring for search"
            value={titleSubstring}
            onChange={(event) => {
              setTitleSubstring(event.target.value);
            }}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            onChange={(event) => {
              setFilterOption(event.target.value);
            }}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos().map((todo) => (
            <li
              key={todo.id}
              className="TodoList__item TodoList__item--unchecked"
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  X
                </button>
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => {
                    getUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
