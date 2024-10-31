import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);
  const setCurrentTodo = (clickedTodo: Todo) =>
    dispatch(currentTodoActions.setCurrentTodo(clickedTodo));

  return (
    <tr data-cy="todo" className="">
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
          className={cn({
            'has-text-success': todo.completed,
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
          onClick={() => setCurrentTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': currentTodo,
                'fa-eye': !currentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
