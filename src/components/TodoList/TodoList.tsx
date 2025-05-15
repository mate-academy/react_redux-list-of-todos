/* eslint-disable */
import React from 'react';
import { setCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    if (filter.status === 'active' && todo.completed) {
      return false;
    };

    if (filter.status === 'completed' && !todo.completed) {
      return false;
    }

    if (!todo.title.toLowerCase().includes(filter.query.toLowerCase())) {
      return false;
    }

    return true;
  });

  if (!filteredTodos.length && filter.query !== '') {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
          <th />
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map((todo: Todo, index: number) => {
          const isActive = currentTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isActive,
              })}
            >
              <td className="is-vcentered">{index + 1}</td>

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
                  onClick={() => dispatch(setCurrentTodo(isActive ? null : todo))}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !isActive,
                        'fa-eye-slash': isActive,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
