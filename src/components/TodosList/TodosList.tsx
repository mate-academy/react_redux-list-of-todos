import React, { useEffect } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todos';
import {
  loadTodosAction, loadUserAction, setInputValue, setSelectValue,
} from '../../store/actions';
import {
  getInputValue, getSelectValue, getTodosSelector, getUserSelector,
} from '../../store/selectors';
import { getUser } from '../../api/user';
import { Todo } from '../../react-app-env';

export const TodosList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const inputValue = useSelector(getInputValue);
  const selectValue = useSelector(getSelectValue);
  const user = useSelector(getUserSelector);

  const handelSelectUser = async (userId: number) => {
    if (userId !== user?.id) {
      const userFromServer = await getUser(userId);

      dispatch(loadUserAction(userFromServer));
    }
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

  const filterTodos = (): Todo[] => {
    let filteredTodos;

    switch (selectValue) {
      case 'active':
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

  const filteredTodos = filterTodos();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
    filterTodos();
  };

  const deleteTodo = (todoId: number) => {
    dispatch(loadTodosAction(todos.filter(todo => todo.id !== todoId)));
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
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label htmlFor="searchInpu  t">
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>
              <div>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  Remove
                </button>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': user?.id === todo.userId },
                  )}
                  type="button"
                  onClick={() => handelSelectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
