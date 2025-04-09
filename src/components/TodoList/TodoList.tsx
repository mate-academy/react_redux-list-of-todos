/* eslint-disable */
import React from 'react';
import { useAppSelected } from '../../app/hooks';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelected(state => state.todos);
  const { query, status } = useAppSelected(state => state.filter);
  const currentTodo = useAppSelected(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    switch (status) {
      case 'active':
        return matchesQuery && !todo.completed;
      case 'completed':
        return matchesQuery && todo.completed;
      case 'all':
      default:
        return matchesQuery;
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
        {filteredTodos.length > 0 && (
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
        )}

        <tbody>
          {filteredTodos.map(todo => (
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
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                  <span className="icon">
                    <i className={classNames("far", {
                      'fa-eye': currentTodo?.id !== todo.id,
                      'fa-eye-slash': currentTodo?.id === todo.id,
                    })} />
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
