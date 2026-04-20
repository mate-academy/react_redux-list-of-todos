import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { clearCurrentTodo } from '../../features/todos';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            if (currentTodo?.id === todo.id) {
              dispatch(clearCurrentTodo());
            } else {
              dispatch(setCurrentTodo(todo));
            }
          }}
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
  );
};
