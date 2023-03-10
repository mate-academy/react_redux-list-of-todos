import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const selectTodo = (selectedTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(selectedTodo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      {!todo.completed
        ? <td className="is-vcentered" />
        : (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        )}
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
          onClick={() => selectTodo(todo)}
        >
          <span className="icon">
            {currentTodo?.id === todo.id
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
