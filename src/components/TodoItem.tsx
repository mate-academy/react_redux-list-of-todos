import React from 'react';
import cl from 'classnames';
import { Todo } from '../types/Todo';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { actions as currentTodoActions } from '../features/currentTodo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleTodoSelect = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

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
        <p className={cl(
          {
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          },
        )}
        >
          {todo.title}

        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => handleTodoSelect()}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={cl(
              'far',
              {
                'fa-eye': todo.id !== currentTodo?.id,
                'fa-eye-slash': todo.id === currentTodo?.id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
