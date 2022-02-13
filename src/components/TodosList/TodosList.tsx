import React, { useEffect } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import {
  loadTodosAction, loadUserAction, setInputValue, setSelectedUserId, setSelectValue,
} from '../../store/actions';
import {
  getInputValue, getSelectedUserId, getSelectValue, getTodosSelector,
} from '../../store/selectors';
import { getUser } from '../../api/user';
import { Todo } from '../../react-app-env';

export const TodosList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const inputValue = useSelector(getInputValue);
  const selectValue = useSelector(getSelectValue);
  const selectedUserId = useSelector(getSelectedUserId);

  const handelSelectUser = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
    dispatch(setSelectedUserId(userFromServer.id));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectValue(event.target.value));
  };

  const filterTodos = (todosFoFiler: Todo[]): Todo[] => {
    let filteredTodos;

    switch (selectValue) {
      case 'active':
        filteredTodos = todosFoFiler.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todosFoFiler.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todosFoFiler];
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(inputValue.toLocaleLowerCase())
    ));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
    filterTodos(todos);
  };

  return (
    <div className="TodoList">
      <select
        value={selectValue}
        onChange={(event) => {
          handleSelectChange(event);
        }}
      >
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
      <br />
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filterTodos(todos).map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label htmlFor="searchInput">
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>
              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                )}
                type="button"
                onClick={() => handelSelectUser(todo.userId)}
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
