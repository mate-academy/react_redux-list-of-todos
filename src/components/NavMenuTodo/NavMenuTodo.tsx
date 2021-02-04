import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import {
  activeTodosAction,
  ACTIVE_TODOS,
  allTodosAction,
  ALL_TODOS,
  completedTodosAction,
  COMPLETED_TODOS,
  filterTodos,
} from '../../store/todosList';
import './NavMenuTodo.scss';
import { getNavMenuTypeFiltering } from '../../store';
import { clearSelectedUser } from '../../store/currentUser';
import { TODOSTYPE } from '../../api/interface';

type NavMenuTodo = {
  todosList: TODOSTYPE[];
  setTodosList: Function;
};

export const NavMenuTodo: React.FC<NavMenuTodo> = ({ todosList, setTodosList }) => {
  const dispatch = useDispatch();
  const navMenuType = useSelector(getNavMenuTypeFiltering);

  const sortingTodoList = useCallback(() => {
    const sortList = [...todosList].sort(
      (todo1: TODOSTYPE, todo2: TODOSTYPE) => todo1.title.localeCompare(todo2.title),
    );

    setTodosList(sortList);
  }, [todosList, setTodosList]);

  const randomizeList = useCallback(() => {
    const randomTodos: TODOSTYPE[] = [...todosList];

    for (let i = randomTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = randomTodos[i];

      randomTodos[i] = randomTodos[j];
      randomTodos[j] = temp;
    }

    setTodosList(randomTodos);
  }, [todosList, setTodosList]);

  return (
    <div className="nav-menu">
      <input
        type="text"
        placeholder="Tittle...."
        onChange={(event) => {
          dispatch(filterTodos(event.target.value));
        }}
      />
      <div>
        <ul className="filters">
          <li>
            <a
              href="#/all"
              className={classNames({ selected: navMenuType === ALL_TODOS })}
              onClick={() => {
                dispatch(allTodosAction());
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              className={classNames({ selected: navMenuType === ACTIVE_TODOS })}
              onClick={() => {
                dispatch(activeTodosAction());
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              className={classNames({ selected: navMenuType === COMPLETED_TODOS })}
              onClick={() => {
                dispatch(completedTodosAction());
              }}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch(clearSelectedUser())}
        >
          Clear selected
        </button>
        <button
          type="button"
          className="randomize"
          onClick={() => {
            randomizeList();
          }}
        >
          Randomize
        </button>
        <button
          type="button"
          className="sort"
          onClick={() => sortingTodoList()}
        >
          Sort
        </button>
      </div>
    </div>
  );
};
