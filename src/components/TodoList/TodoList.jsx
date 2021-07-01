import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { actions as todosActions, DELETE } from '../../store/todos';
import { getTitleFilter, getTodosFiltering, getRandomOrder } from '../../store';
import { actions as titleFilterActions, SET as setTitleFilter } from '../../store/titleFilter';
import {
  actions as todosFilteringActions,
  SET as setTodosFiltering,
} from '../../store/todosFiltering';
import { actions as randomizeActions, SWITCH } from '../../store/randomize';

import './TodoList.scss';

export function TodoList({ todos, selectedUser, selectUser }) {
  const titleFilter = useSelector(getTitleFilter);
  const todosFiltering = useSelector(getTodosFiltering);
  const random = useSelector(getRandomOrder);
  const dispatch = useDispatch();

  const filterTodos = useCallback((todos) => {
    switch (todosFiltering) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todosFiltering]);

  const shuffle = useCallback((todos) => {
    const result = [];
    let todosLength = todos.length;
    let index;

    while (todosLength) {
      // eslint-disable-next-line no-plusplus
      index = Math.floor(Math.random() * todosLength--);
      result.push(todos.splice(index, 1)[0]);
    }

    return result;
  }, [])

  const checkTitle = useCallback((title, titleFilter) => (
    title && title.includes(titleFilter)
  ), []);

  let preparedTodos = filterTodos([...todos]);

  if (random) {
    preparedTodos = shuffle(preparedTodos);
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label htmlFor="filterByTitle">
        {`Filter todos by title `}
        <input
          className="sorting-input"
          type="text"
          placeholder="Enter a query"
          id="filterByTitle"
          value={titleFilter}
          onChange={({target}) => {
            dispatch(titleFilterActions[setTitleFilter](target.value));
          }}
        />
      </label>

      <select
        className="sorting-input"
        name="sortingTodos"
        id="sortingTodos"
        value={todosFiltering}
        onChange={({target}) => {
          dispatch(todosFilteringActions[setTodosFiltering](target.value));
        }}
      >
        <option value="all">Show all todos</option>
        <option value="active">Show uncompleted todos</option>
        <option value="completed">Show completed todos</option>
      </select>

      <button
        type="button"
        className={classNames(
          'sorting-input',
          {
            'randomize-active': random,
            'randomize-inactive': !random,
          },
        )}
        onClick={() => {
          dispatch(randomizeActions[SWITCH]())
        }}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {preparedTodos.map(todo => (
            checkTitle(todo?.title, titleFilter) ? (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                
                <div className="TodoList__button-wrapper">
                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      { 'button--selected': selectedUser === todo.userId },
                    )}
                    type="button"
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                  >
                    {todo.userId ? (
                      <>
                        User&nbsp;#
                        {todo.userId}
                      </>
                    ) : (
                      <>
                        not assigned
                      </>
                    )}
                  </button>

                  <button
                    className="TodoList__user-button button"
                    type="button"
                    onClick={() => {
                      dispatch(todosActions[DELETE](todo.id))
                    }}
                  >
                    delete todo
                  </button>
                </div>
              </li>
            ) : (
              null
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
      userId: PropTypes.number,
    }),
  ),
  selectedUser: PropTypes.number,
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  selectedUser: 0,
};
