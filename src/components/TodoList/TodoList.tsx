/* eslint-disable max-len */
import { useCallback, useMemo } from 'react';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getFilteredTodos } from '../helpers/helpers';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const [currentTodo, { items }, { query, status }] = useAppSelector(
    (state) => [state.currentTodo, state.todos, state.filter],
  );

  const setTodo = useCallback(
    (todo: Todo) => dispatch(actions.setTodo(todo)),
    [],
  );

  const filteredTodos = useMemo(
    () => getFilteredTodos(query, status, items),
    [items, query, status],
  );

  const listOfTodos = useMemo(
    () => filteredTodos.map((todo) => (
      <tr data-cy="todo" key={todo.id}>
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
            className={
              todo.completed ? 'has-text-success' : 'has-text-danger'
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
            onClick={() => setTodo(todo)}
          >
            <span className="icon">
              <i
                className={`far ${
                  todo.id === currentTodo?.id ? 'fa-eye-slash' : 'fa-eye'
                }`}
              />
            </span>
          </button>
        </td>
      </tr>
    )),
    [filteredTodos],
  );

  return (
    <>
      {filteredTodos.length > 0 ? (
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

          <tbody>{listOfTodos}</tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
