import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { fetchUser } from '../../store/ActionCreators';
import { useFetchTodosQuery } from '../../api/todoApi';

export const TodosList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: todos, isLoading, error } = useFetchTodosQuery();

  if (isLoading) {
    return (
      <div>
        Loading ...
      </div>
    );
  }

  if (error || !todos) {
    return (
      <div>
        error
      </div>
    );
  }

  const buttonHandler = (userId: number) => {
    dispatch(fetchUser(userId));
  };

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
                to="/user"
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                onClick={() => buttonHandler(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
