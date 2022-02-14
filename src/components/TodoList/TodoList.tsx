import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import { getTodos } from '../../api/todos';
import {
  loadTodosAction,
  loadVisibleTodosAction,
  loadUserAction,
} from '../../store/actions';
import { getVisibleTodosSelector, getUserSelector } from '../../store/selectors';
import './TodoList.scss';
import { getUser } from '../../api/user';
import { TodoListForm } from '../TodoListForm';

// import {
//   InputGroup,
//   FormControl,
//   Form,
// } from 'react-bootstrap';
// import { Loader } from '../Loader';
// import { ErrorMessage } from '../ErrorMessage';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getVisibleTodosSelector);
  const user = useSelector(getUserSelector);

  const selectUserHandler = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
      dispatch(loadVisibleTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <TodoListForm />

        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={cn(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor={String(todo.id)}>
                <input
                  id={String(todo.id)}
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={cn(
                  'TodoList__user-button button',
                  { 'TodoList__user-button--selected': todo.userId === user?.id },
                )}
                type="button"
                onClick={() => selectUserHandler(todo.userId)}
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
