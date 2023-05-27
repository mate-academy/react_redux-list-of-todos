import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => todo.title
        .toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      .filter(todo => {
        switch (status) {
          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      })
  ), [status, todos, query]);

  const handleClickSelect = (todo: Todo) => (
    dispatch(currentTodoActions.setTodo(todo)));

  return (
    filteredTodos.length === 0
      ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
      : (
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
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames(
                  { 'has-background-info-light': todo === currentTodo },
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
                  <p className={todo.completed
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
                    onClick={() => handleClickSelect(todo)}
                  >
                    <span className="icon">
                      <i className={todo === currentTodo
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
  );
};
