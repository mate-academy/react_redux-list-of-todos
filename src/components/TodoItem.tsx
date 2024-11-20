import React from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { currentTodoSlice } from '../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setCurrentTodo = () => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
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
        <p
          className={cn({
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
          onClick={setCurrentTodo}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': currentTodo !== todo,
                'fa-eye-slash': currentTodo === todo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
