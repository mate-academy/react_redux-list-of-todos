import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import { getUser } from '../../api/user';

import { loadTodosAction, loadUserAction, changeTodoStatusAction } from '../../store/actions';
import { getTodosSelector, getUserSelector } from '../../store/selectors';

enum CompletionStatus {
  All = '',
  Completed = 'completed',
  Active = 'active',
}

function debounce(f: (...args: any[]) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
}

export const TodoList: React.FC = () => {
  const [titleQuery, setTitleQuery] = useState('');
  const [titleQueryForSearch, setTitleQueryForSearch] = useState('');
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>(CompletionStatus.All);
  const dispatch = useDispatch();

  const setTitleQueryForSearchWithDebounce = useCallback(
    debounce(setTitleQueryForSearch, 1000),
    [],
  );

  const todos = useSelector(getTodosSelector);
  const selectedUser = useSelector(getUserSelector);

  const handleTitleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: query } = event.target;

    setTitleQuery(query);
    setTitleQueryForSearchWithDebounce(query);
  };

  useEffect(() => {
    (async function loadTodosFromServer() {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
    }());
  }, []);

  const handleUser = async (userId: number) => {
    if (!selectedUser || selectedUser.id !== userId) {
      const userFromServer = await getUser(userId);

      dispatch(loadUserAction(userFromServer));
    }
  };

  const handleChangeTodoStatus = (id: number) => {
    dispatch(changeTodoStatusAction(id));
  };

  const getPreparedTodos = () => {
    const titleQueryToLowerCase = titleQueryForSearch.toLowerCase();
    let isCompletedStatus: boolean;

    switch (completionStatus) {
      case CompletionStatus.Active:
        isCompletedStatus = false;
        break;
      case CompletionStatus.Completed:
        isCompletedStatus = true;
        break;
      default:
        return todos.filter(todo => (
          todo.title.toLowerCase()
            .includes(titleQueryToLowerCase)
        ));
    }

    return todos.filter(todo => (
      todo.title.toLowerCase()
        .includes(titleQueryToLowerCase)
        && (isCompletedStatus ? todo.completed : !todo.completed)
    ));
  };

  const preparedTodos = getPreparedTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label htmlFor="titleQuery">
        Find by Title:
        {' '}
        <input
          type="text"
          id="titleQuery"
          value={titleQuery}
          onChange={handleTitleQuery}
        />
      </label>

      <select
        value={completionStatus}
        onChange={event => setCompletionStatus(event.target.value as CompletionStatus)}
      >
        <option value={CompletionStatus.All}>all</option>
        <option value={CompletionStatus.Completed}>completed</option>
        <option value={CompletionStatus.Active}>active</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {preparedTodos.map(todo => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed, 'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label htmlFor={`checkbox-${todo.id}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => handleChangeTodoStatus(todo.id)}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classnames({
                  button: true,
                  'TodoList__user-button': true,
                  'TodoList__user-button--selected': selectedUser && todo.userId === selectedUser.id,
                })}
                type="button"
                onClick={() => handleUser(todo.userId)}
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
