import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import './TodoList.scss';
import { actions as loadingActions } from '../../store/loading';
import { actions as currentTodoActions } from '../../store/currentTodo';
import { useAppSelector } from '../../store/hooks';
import { requestTodos } from '../../api/api';

import { Loader } from '../Loader/Loader';

type FuncArg = (v: string) => void;

const debounce = (f: FuncArg, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const [appliedQuery, setAppliedQuery] = useState('');
  const loading = useAppSelector(state => state.loading.loading);
  const todos = useAppSelector(state => state.currentTodo.todos);
  const status
    = useAppSelector(state => state.currentTodo.todoStatus);
  const selectedUser
    = useAppSelector(state => state.currentTodo.selectedUser);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    requestTodos()
      .then(result => dispatch(currentTodoActions.getTodos(result)))
      .then(() => dispatch(loadingActions.finishLoading()));
  }, []);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500),
    [],
  );

  const selectStatus = (input: string) => {
    switch (input) {
      case 'all':
        dispatch(currentTodoActions.setTodoStatus(null));
        break;
      case 'completed':
        dispatch(currentTodoActions.setTodoStatus(true));
        break;
      case 'active':
        dispatch(currentTodoActions.setTodoStatus(false));
        break;
      default:
    }
  };

  const selectUser
    = (todoId: number) => dispatch(currentTodoActions.selectUser(todoId));

  const randomizeTodos = () => dispatch(currentTodoActions.randomize());

  let filteredTodos = todos
    .filter(todo => (todo.title).toLowerCase()
      .includes(appliedQuery.toLowerCase().trim()));

  if (status !== null) {
    filteredTodos = filteredTodos?.filter(todo => todo.completed === status);
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filters">
        <label>
          <input
            data-cy="filterByTitle"
            className="TodoList__input input"
            type="text"
            placeholder="Filter by title"
            onChange={(event) => {
              applyQuery(event.target.value);
            }}
          />
        </label>

        <label>
          <select
            name="select"
            className="TodoList__input select"
            onChange={(event) => selectStatus(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button
          type="button"
          className="button TodoList__input"
          onClick={() => randomizeTodos()}
        >
          Randomize
        </button>
      </div>

      {loading
        ? <Loader />
        : (
          <div className="TodoList__list-container">
            <ul className="TodoList__list" data-cy="listOfTodos">
              {filteredTodos.map(todo => (
                <div key={todo.id}>
                  <li
                    className={classNames(
                      'TodoList__item',
                      { 'TodoList__item--unchecked': !todo.completed },
                      { 'TodoList__item--checked': todo.completed },
                    )}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>
                    {todo.userId
                      && (
                        <button
                          data-cy="userButton"
                          className={classNames(
                            'TodoList__user-button button',
                            {
                              'TodoList__user-button--selected button':
                                todo.userId === selectedUser,
                            },
                          )}
                          type="button"
                          onClick={
                            () => {
                              selectUser(todo.userId);
                            }
                          }
                        >
                          {`User ${todo.userId}`}
                        </button>
                      )}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
