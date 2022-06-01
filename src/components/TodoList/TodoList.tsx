import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './TodoList.scss';

import classNames from 'classnames';

import { TodoListControlPanel } from '../TodoListControlPanel';

import {
  getTodosFromServer,
  deleteTodo,
  addTodo,
} from '../../api/api';
import { todos } from '../../dataFix/todos';

import {
  getSelectedIDSelector,
  getVisibleTodosSelector,
} from '../../store/TodosReducer/selectors';
import {
  setSelectedIDAction,
  loadTodosAction,
} from '../../store/TodosReducer/actions';

export const TodoList: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const visibleTodos = useSelector(getVisibleTodosSelector);
  const selectedUserId = useSelector(getSelectedIDSelector);

  const getTodos = useCallback(async () => {
    const todosFromServer = await getTodosFromServer();

    dispatch(loadTodosAction(todosFromServer));
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <button
        type="button"
        onClick={() => {
          todos.forEach(todo => addTodo(todo));
          getTodos();
        }}
        className="button"
      >
        FIX DATA
      </button>

      <TodoListControlPanel />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos?.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <div className="TodoList__user-buttons">
                <button
                  className={classNames(
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    },
                    'button',
                  )}
                  type="button"
                  onClick={() => dispatch(setSelectedIDAction(todo.userId))}
                  data-cy="userButton"
                >
                  User&nbsp;#
                  {todo.userId}
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={async () => {
                    await deleteTodo(todo.id);
                    getTodos();
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
