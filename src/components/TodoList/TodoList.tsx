/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { selectTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }, [todos, status, query]);

  return (
    <>
      {filteredTodos.length === 0 && (
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
          {filteredTodos.map(todo => (

          <tr
          key={todo.id}
          data-cy="todo">
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
              className={classNames(
                todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger',
              )}
            >
              {todo.title}
            </p>
            </td>

            <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() =>
                    dispatch(selectTodo(todo))}
                >
                <span className="icon">
                  <i
                  className={classNames({
                    'far fa-eye': currentTodo?.id !== todo.id,
                    'far fa-eye-slash': currentTodo?.id === todo.id,
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
