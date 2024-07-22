/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

interface TodoListType {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListType> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const icon = currentTodo ? 'fa-eye-slash' : 'fa-eye';

  const { setCurrent } = currentTodoSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <>
      {todos.length === 0 && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

      {todos.length > 0 && <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({'has-background-info-light': currentTodo})}
            >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed &&
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed })
                }
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(setCurrent(todo))}
              >
                <span className="icon">
                  <i className={`far ${icon}`} />
                </span>
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>}
    </>
  );
};
