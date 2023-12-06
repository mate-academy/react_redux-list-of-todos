/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  const filteredTodos = useMemo(() => {
    let todosCopy = [...todos];

    if (query) {
      todosCopy = todosCopy
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (status) {
      case Status.Active:
        todosCopy = todosCopy.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        todosCopy = todosCopy.filter(todo => todo.completed);
        break;
      case Status.All:
      default:
        break;
    }

    return todosCopy;
  }, [todos, query, status]);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            className={cn({ 'has-background-info-light': todo.completed })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">

              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}

            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(currentTodoActions.setTodo(todo))}
              >
                <span className="icon">
                  <i className={
                    `far ${selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`
                  }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
