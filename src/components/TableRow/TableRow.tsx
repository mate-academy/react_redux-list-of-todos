/* eslint-disable @typescript-eslint/no-shadow */
import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentTodo } from '../../features/currentTodo/selectors';
import {
  actions as selectTodoActions,
} from '../../features/currentTodo/currentTodo';

type Props = {
  todo: Todo;
};

export const TableRow: FC<Props> = ({ todo }) => {
  const selectedTodo = useAppSelector(selectCurrentTodo);
  const dispatch = useAppDispatch();

  const onSelectTodo = (todo: Todo) => {
    dispatch(selectTodoActions.setTodo(todo));
  };

  return (
    <tr key={todo.id} data-cy="todo">
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
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': todo.id !== selectedTodo?.id,
                'fa-eye-slash': todo.id === selectedTodo?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
