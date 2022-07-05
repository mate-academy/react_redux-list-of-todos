import './TodoList.scss';
import classNames from 'classnames';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { debounce } from 'lodash';
import { deleteTodo, requestTodos, requestUserById } from '../../api';
import { Todo } from '../../react-app-env';

import { getTodosSelector } from '../../store/selectors';

import {
  setTodosActions,
  setUserActions,
} from '../../store/actions';

const shuffleArray = (todosToShuffle: Todo[]) => {
  return todosToShuffle
    .map(todo => ({ todo, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ todo }) => todo);
};

const categoryOfTodos = (todosToFilter: Todo[], group: string) => {
  if (group === 'completed') {
    return todosToFilter.filter(todo => todo.completed);
  }

  if (group === 'active') {
    return todosToFilter.filter(todo => !todo.completed);
  }

  return todosToFilter;
};

export const TodoList: React.FC = () => {
  const [visibleText, setVisibleText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('all');

  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);

  // eslint-disable-next-line no-console
  console.log('render TodoList');

  // #region todos
  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await requestTodos();

      dispatch(setTodosActions(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const groupOfTodos = categoryOfTodos(todos, category);
  const searchQuery = useCallback(debounce(setSearchText, 1000), []);

  const todosToShow = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('filtering todos', searchText);

    return groupOfTodos.filter(todo => todo.title.includes(searchText));
  }, [groupOfTodos, searchText]);

  const deletingTodo = async (todo: Todo) => {
    await deleteTodo(todo.id);
    const newTodos = await requestTodos();

    dispatch(setTodosActions(newTodos));
  };
  // #endregion

  // #region User
  const getUser = async (id: number) => {
    const user = await requestUserById(id);

    dispatch(setUserActions(user));
  };
  // #endregion

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="filter todos"
          value={visibleText}
          onChange={(event) => {
            searchQuery(event.target.value);
            setVisibleText(event.target.value);
          }}
          data-cy="filterByTitle"
        />

        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value="all">
            All
          </option>

          <option value="active">
            Active
          </option>

          <option value="completed">
            Completed
          </option>
        </select>

        <button
          type="button"
          className="button"
          onClick={() => {
            dispatch(setTodosActions(shuffleArray([...todos])));
          }}
        >
          Random
        </button>

        <ul className="TodoList__list" data-cy="listOfTodos">
          {todosToShow.map(todo => {
            return (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <div className="buttons">
                  <button
                    type="button"
                    onClick={() => {
                      getUser(todo.userId);
                    }}
                    className="button
                      TodoList__user-button
                      TodoList__user-button--selected"
                    data-cy="userButton"
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      deletingTodo(todo);
                    }}
                    className="button
                      TodoList__user-button
                      TodoList__delete-button--selected"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
