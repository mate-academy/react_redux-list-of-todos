import './TodoList.scss';
import classNames from 'classnames';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTodo, requestTodos, requestUserById } from '../../api';
import { Todo } from '../../react-app-env';

import { getTodosSelector } from '../../store/selectors';
import { setTodosActions, setUserActions } from '../../store/actions';

export const TodoList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('all');

  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);

  // #region todos
  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await requestTodos();

      dispatch(setTodosActions(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const categoryOfTodos = (todosToFilter: Todo[], group: string) => {
    if (group === 'completed') {
      return todosToFilter.filter(todo => todo.completed);
    }

    if (group === 'active') {
      return todosToFilter.filter(todo => !todo.completed);
    }

    return todosToFilter;
  };

  const filterTodos = (group2: Todo[]) => {
    return group2.filter(todo => todo.title.includes(searchText));
  };

  const groupOfTodos = categoryOfTodos(todos, category);

  const todosToShow = filterTodos(groupOfTodos);

  const shuffleArray = (todosToShuffle: Todo[]) => {
    return todosToShuffle
      .map(todo => ({ todo, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ todo }) => todo);
  };

  const deletingTodo = (id: number) => {
    deleteTodo(id)
      .then(() => requestTodos());
  };
  // #endregion

  // #region User
  const getUser = async (id: number) => {
    const serverUser = await requestUserById(id);

    dispatch(setUserActions(serverUser));
  };
  // #endregion

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="filter todos"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
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
                      deletingTodo(todo.id);
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
