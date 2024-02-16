/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector<Todo[]>((state) => state.todos);
  const checkedTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector((state) => state.filter);

  const filteredTodos = todos.filter((todo) => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  });

  const visibleTodos = filteredTodos.filter((todo) => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  const wrongQuery = visibleTodos.length < 1;

  return (
    <>
      {wrongQuery && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {visibleTodos.map((todo) => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames(
                { 'has-background-info-light': checkedTodo?.id === todo.id },
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
                <p
                  className={classNames({
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
                  onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye-slash': checkedTodo?.id === todo.id,
                      'fa-eye': checkedTodo?.id !== todo.id,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
