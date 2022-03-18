import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import {
  loadTodosAction,
  loadUserAction,
  setErrorAction,
  setStatusFilterAction,
  setTitleFilterAction,
} from '../../store/actions';
import {
  getTodosSelector,
  getTitleFilterSelector,
  getStatusFilterSelector,
} from '../../store/selectors';
import './TodoList.scss';
import { getUser } from '../../api/users';

type Props = {
  user: User | null,
};

export const TodoList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { user } = props;
  const todos = useSelector(getTodosSelector);
  const titleFilter = useSelector(getTitleFilterSelector);
  const statusFilter = useSelector(getStatusFilterSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      let todosFromServer = await getTodos();

      switch (statusFilter) {
        case 'completed':
          todosFromServer = todosFromServer.filter(todo => todo.completed === true);
          break;
        case 'not completed':
          todosFromServer = todosFromServer.filter(todo => todo.completed === false);
          break;
        default:
      }

      dispatch(loadTodosAction(todosFromServer
        .filter(todo => todo.title.includes(titleFilter))));
    };

    loadTodosFromServer();
  }, [todos.length, titleFilter, statusFilter]);

  const handleUserChange = useCallback((userId: number) => {
    const loadUserFromServer = async () => {
      try {
        const userFromServer = await getUser(userId);

        dispatch(loadUserAction(userFromServer));
        dispatch(setErrorAction(false));
      } catch {
        dispatch(loadUserAction(null));
        dispatch(setErrorAction(true));
      }
    };

    loadUserFromServer();
  }, [user]);

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    dispatch(setTitleFilterAction(newTitle));
  }, [titleFilter]);

  const handleStatusChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    dispatch(setStatusFilterAction(newStatus));
  }, [statusFilter]);

  return (
    <div className="TodoList">
      <input
        type="text"
        placeholder="Title"
        className="TodoList__filter"
        value={titleFilter}
        onChange={handleTitleChange}
      />
      <select
        value={statusFilter}
        onChange={handleStatusChange}
      >
        <option value="all">Show all</option>
        <option value="completed">Show completed</option>
        <option value="not completed">Show not completed</option>
      </select>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
              key={todo.id}
            >
              <label htmlFor={`${todo.id}`}>
                <input type="checkbox" id={`${todo.id}`} checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              <button
                onClick={() => handleUserChange(todo.userId)}
                className={
                  classNames(
                    'TodoList__user-button',
                    { button: todo.userId !== user?.id },
                    { 'TodoList__user-button--selected': todo.userId === user?.id },
                  )
                }
                type="button"
              >
                {`User ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
