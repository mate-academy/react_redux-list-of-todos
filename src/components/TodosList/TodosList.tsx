import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import { loadTodosAction, loadUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import { getUser } from '../../api/user';

export const TodosList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  const handleClick = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

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

              <Link
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                to={`/user/${todo.userId}`}
                onClick={() => handleClick(todo.userId)}
              >
                {`user: ${todo.userId}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
