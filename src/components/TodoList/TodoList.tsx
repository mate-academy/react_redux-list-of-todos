/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getVisibleTodos } from '../../helpers/getVisibleTodos';

export const TodoList: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, status)
  ), [todos, query, status]);

  return (
    visibleTodos.length === 0
      ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {visibleTodos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => selectTodo(todo)}
                  >
                    <span className="icon">
                      <i className={cn(
                        { 'far fa-eye': selectedTodo?.id !== todo.id },
                        { 'far fa-eye-slash': selectedTodo?.id === todo.id },
                      )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ));
});
