/* eslint-disable no-tabs */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, getUserById } from '../../Api';
import { getTodosSelector } from '../../store/Selectors';
import { setTodosAction, selectUserAction } from '../../store/Actions';

import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const LoadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    LoadTodosFromServer();
  }, []);

  const todos = useSelector(getTodosSelector);

  const getUser = async (userId:number) => {
    const selektUser = await getUserById(userId);

    dispatch(selectUserAction(selektUser));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map((todo) => (

            <li
              className="TodoList__item TodoList__item--unchecked"
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
									TodoList__user-button
									TodoList__user-button--selected
									button
								"
                type="button"
                onClick={() => getUser(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>

          ))}

        </ul>
      </div>
    </div>
  );
};
