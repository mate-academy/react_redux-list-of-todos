import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodos,
  getUser,
  getHasUserLoadingError,
} from '../../store/selectors';

import {
  setTodos,
  setUser,
  toggleUserLoaderVisibility,
  toggleHasUserLoadingError,
} from '../../store/actions';

import './TodoList.scss';
import { getTodos as getTodosFromServer, getUser as getUserFromServer } from '../../api/api';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const user = useSelector(getUser);
  const hasUserLoadingError = useSelector(getHasUserLoadingError);

  const [filterTodosBy, setFilterTodosBy] = useState('');
  const [preparedTodos, setPreparedTodos] = useState([] as Todo[]);
  const [title, setTitle] = useState('');
  const [titleToSearch, setTitleToSearch] = useState('');
  const [todosLoading, setTodosLoading] = useState(false);

  useEffect(() => {
    setTodosLoading(true);
    (async () => {
      const todosFromServer = await getTodosFromServer();

      dispatch(setTodos(todosFromServer));
      setTodosLoading(false);
    })();
  }, []);

  const prepareTodos = () => {
    let copiedTodos = [...todos];

    if (titleToSearch) {
      copiedTodos = copiedTodos.filter(
        todo => todo.title.toLowerCase().includes(titleToSearch),
      );
    }

    switch (filterTodosBy) {
      case 'active':
        setPreparedTodos(copiedTodos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setPreparedTodos(copiedTodos.filter(todo => todo.completed));
        break;

      default:
        setPreparedTodos(copiedTodos);
    }
  };

  useEffect(() => {
    prepareTodos();
  }, [todos, titleToSearch, filterTodosBy]);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setTitleToSearch(value.toLowerCase());
  };

  const changeTodoStatus = (todoId: number) => {
    const changedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    dispatch(setTodos(changedTodos));
  };

  const randomizeOrder = () => {
    const copiedTodos = [...todos];

    copiedTodos.sort(() => Math.random() - 0.5);

    dispatch(setTodos(copiedTodos));
  };

  const loadUser = async (userId: number) => {
    try {
      const userFromServer = await getUserFromServer(userId);

      dispatch(setUser(userFromServer));
      dispatch(toggleUserLoaderVisibility());

      if (hasUserLoadingError) {
        dispatch(toggleHasUserLoadingError());
      }
    } catch {
      dispatch(toggleUserLoaderVisibility());
      if (!hasUserLoadingError) {
        dispatch(toggleHasUserLoadingError());
      }
    }
  };

  const selectUser = (userId: number) => {
    if (userId !== user?.id || hasUserLoadingError) {
      dispatch(toggleUserLoaderVisibility());
      loadUser(userId);
    }
  };

  const deleteTodo = (todoId: number) => {
    const copiedTodos = todos.filter(todo => todo.id !== todoId);

    dispatch(setTodos(copiedTodos));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__search-bar">
        <label className="label" htmlFor="title-input">
          Search todo:
          <div className="control">
            <input
              type="text"
              className="input TodoList__title-input"
              id="title-search-bar"
              name="titleToSearch"
              placeholder="Title"
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
        </label>

        <div className="select">
          <select
            name="todosToShow"
            value={filterTodosBy}
            onChange={event => setFilterTodosBy(event.target.value)}
          >
            <option value="">Show all</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="button"
          name="isRandomized"
          className={classNames(
            'button',
            'TodoList__randomize-button',
            'is-light',
          )}
          onClick={randomizeOrder}
        >
          Randomize
        </button>
      </div>

      {todosLoading ? (
        <progress
          className={classNames(
            'progress',
            'is-small',
            'is-link',
          )}
          max="100"
        >
          10%
        </progress>
      ) : (
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
                key={todo.id}
              >

                <label htmlFor={`todo-checkbox-${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`todo-checkbox-${todo.id}`}
                    name="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => changeTodoStatus(todo.id)}
                  />
                  <p>
                    {todo.title}
                    {todo.id}
                  </p>
                </label>

                <div className="TodoList__button-wrapper">
                  <button
                    type="button"
                    className="button TodoList__delete-button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      { 'TodoList__user-button--selected': user?.id === todo.userId },
                    )}
                    type="button"
                    value={todo.userId}
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User#${todo.userId}`}
                  </button>
                </div>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
