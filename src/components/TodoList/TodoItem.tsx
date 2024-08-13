import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { currentTodoReducer } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../features/useAppSelector';

interface Prop {
  todo: Todo;
}

export const TodoItem: React.FC<Prop> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const activeModal = () => dispatch(currentTodoReducer(todo));
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <tr data-cy="todo">
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
          onClick={() => activeModal()}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                currentTodo && currentTodo.id === todo.id
                  ? 'fa-eye-slash'
                  : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
