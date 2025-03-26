import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({ todo, selectedTodo }) => {
  const dispatch = useAppDispatch();

  const opedButton = (todoElement: Todo) =>
    dispatch(currentTodoSlice.actions.selectTodo(todoElement));

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>

      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered"></td>
      )}

      <td className="is-vcentered is-expanded">
        <p
          className={cn({
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
          onClick={() => opedButton(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': selectedTodo?.id !== todo.id,
                'fa-eye-slash': selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
