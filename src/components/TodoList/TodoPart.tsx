import React from 'react';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { filterTodos } from '../../app/filterHelper';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoPart: React.FC = () => {
  const todos = useAppSelector((state: RootState) => state.todos);
  const { status, query } = useAppSelector((state: RootState) => state.filter);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = filterTodos(todos, status as Status, query);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tbody>
      {filteredTodos.map((todo: Todo) => (
        <tr data-cy="todo" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td
            className={classnames('is-vcentered', {
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed,
            })}
          >
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classnames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
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
              onClick={() => setCurrentTodo(todo)}
              aria-label={`Select todo ${todo.title}`}
            >
              <span className="icon">
                <i
                  className={
                    todo.id === currentTodo?.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
                  key={todo.id}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
