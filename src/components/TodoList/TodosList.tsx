import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import {
  loadTodosActions,
  loadUserAction,
  setInputValue,
  setSelectValue,
} from '../../store/actions';
import {
  getTodosSelector,
  getUserSelector,
  getInputValue,
  getSelectValue,
} from '../../store/selectors';
import { getUser } from '../../api/user';

export const TodosList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const user = useSelector(getUserSelector);
  const inputValue = useSelector(getInputValue);
  const selectValue = useSelector(getSelectValue);

  const handelSelectUser = async (userId: number) => {
    if (userId !== user?.id) {
      const userFromServer = await getUser(userId);

      dispatch(loadUserAction(userFromServer));
    }
  };

  const filterTodos = (): Todo[] => {
    let filteredTodos;

    switch (selectValue) {
      case 'notCompleted':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(inputValue.toLocaleLowerCase())
    ));
  };

  const filteredTodos = useMemo(filterTodos, [inputValue, selectValue, todos]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectValue(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
    filterTodos();
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosActions(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  return (
    <div className="TodoList">
      <span>
        <span className="has-text-link has-text-weight-bold">Status:</span>
        <select
          value={selectValue}
          onChange={(event) => {
            handleSelectChange(event);
          }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not completed</option>
        </select>
        <br />
        <span className="has-text-link has-text-weight-bold">Find by name:</span>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => {
            handleInputChange(event);
          }}
        />
      </span>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={
                classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })
              }
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={
                  classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.userId === user?.id,
                  })
                }
                type="button"
                onClick={() => handelSelectUser(todo.userId)}
              >
                User #
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
