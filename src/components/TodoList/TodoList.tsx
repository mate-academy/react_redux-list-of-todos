import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import {
  loadTodosAction,
  setStatusFilterAction,
  setTitleFilterAction,
  setUserAction,
} from '../../store/actions';
import { getTodosSelector, getTitleFilterSelector, getStatusFilterSelector } from '../../store/selectors';
import './TodoList.scss';

type Props = {
  userId: number,
};

export const TodoList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { userId } = props;
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

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    dispatch(setTitleFilterAction(newTitle));
  }, [titleFilter]);

  const handleUserChange = useCallback((buttonUserId: number) => {
    const newUser = buttonUserId;

    dispatch(setUserAction(newUser));
  }, [userId]);

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
                    { button: todo.userId !== userId },
                    { 'TodoList__user-button--selected': todo.userId === userId },
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
