/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter(todo => {
    if (status === 'all') {
      return todo.title.includes(query);
    } else if (status === 'active') {
      return todo.title.includes(query) && !todo.completed;
    } else {
      return todo.title.includes(query) && todo.completed;
    }
  });

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
          {filteredTodos.map(todo => {
            return (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i
                      className={classNames('fas', {
                        'fas fa-check': todo.completed,
                      })}
                    />
                  </span>
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
                    onClick={() => {
                      dispatch(setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
