/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';

import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

function filter(todos: Todo[], type: Status) {
  switch (type) {
    case 'active':
      return todos.filter(todo => todo.completed === false);

    case 'completed':
      return todos.filter(todo => todo.completed === true);

    case 'all':
    default:
      return todos;
  }
}

function filterByQuery(todos: Todo[], query: string) {
  const preparedQuery = query.toLowerCase();

  return query.length
    ? todos.filter(todo => todo.title.toLowerCase().includes(preparedQuery))
    : todos;
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const filteredTodos = filterByQuery(filter(todos, status), query);

  return (
    <>
      {!Boolean(filteredTodos.length) ? (
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
            {filteredTodos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={cn('', {
                  'has-background-info-light': todo.id === currentTodo?.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check"></i>
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn('has-text-success', {
                      'has-text-danger': todo.completed === false,
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      {currentTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
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
