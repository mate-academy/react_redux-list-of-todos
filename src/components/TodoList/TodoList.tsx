import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodosAction, loadUserAction } from '../../store/actions';
import { getAllTodos } from '../../api/todos';
import { getTodosSelector } from '../../store/selectors';
import { getUser } from '../../api/user';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  const loadUser = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getAllTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => loadUser(todo.userId)}
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
