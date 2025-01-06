import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoComponent: React.FC<Props> = props => {
  const { todo } = props;
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const isTodoSelected = todo.id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isTodoSelected,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo?.completed && (
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
          onClick={() => dispatch(currentTodoSlice.actions.select(todo))}
        >
          <span className="icon">
            <i className={isTodoSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
