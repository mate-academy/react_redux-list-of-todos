/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUserById } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    const userFromServer = await getUserById(id);

    dispatch(setUserAction(userFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="TodoList__item TodoList__item--unchecked"
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
