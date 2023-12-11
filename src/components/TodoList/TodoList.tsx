/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { preparedTodos } from '../../utils/filterFunc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as CurentTodoAction } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const isSelected = (todo:Todo) => {
    if (selectedTodo?.id === todo.id) {
      dispatch(CurentTodoAction.removeTodo());

      return;
    }

    dispatch(CurentTodoAction.setTodo(todo));
  };

  const visibleTodos = useMemo(
    () => preparedTodos(todos, query, status),
    [todos, query, status],
  );

  return (
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
        {visibleTodos.length === 0 ? (
          <p>
            There are no todos matching current filter criteria
          </p>
        ) : (
          visibleTodos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames(
                { 'has-background-info-light': selectedTodo?.id === todo.id },
              )}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => isSelected(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      { 'far fa-eye': selectedTodo?.id !== todo.id },
                      { 'far fa-eye-slash': selectedTodo?.id === todo.id },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          )))}
      </tbody>
    </table>
  );
};
