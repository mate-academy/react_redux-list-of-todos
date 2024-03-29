/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../../app/filterHelper';
import { Status } from '../../types/Status';
import { actions } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state: RootState) => state.todos);
  const { status, query } = useAppSelector((state: RootState) => state.filter);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = filterTodos(todos, status as Status, query);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {filteredTodos.length === 0 && (
        <tr>
          <td>
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          </td>
        </tr>
      )}

      {filteredTodos.length !== 0 && (
        <table className="table is-narrow is-fullwidth">
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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className={cn('is-vcentered', { 'has-text-success': todo.completed, 'has-text-danger': !todo.completed })}>
                  {todo.completed && (
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={cn({ 'has-text-success': todo.completed, 'has-text-danger': !todo.completed })}>{todo.title}</p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === currentTodo?.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                        key={todo.id}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
