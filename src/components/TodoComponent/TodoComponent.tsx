import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
  index: number;
}

export const TodoComponent: React.FC<Props> = ({ todo, index }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { actions } = currentTodoSlice;

  const getClassTitle = (todoProp: Todo): string => {
    return cn({
      'has-text-danger': !todoProp.completed,
      'has-text-success': todoProp.completed,
    });
  };

  return (
    <tr data-cy="todo" key={todo.id}>
      <td className="is-vcentered">{index + 1}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={getClassTitle(todo)}>{todo.title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(actions.chooseTodo(todo))}
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
