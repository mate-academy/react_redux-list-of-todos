import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const add = (chtodo: Todo) => {
    dispatch(currentTodoActions.addTodo(chtodo));
  };

  function handleEye() {
    add(todo);
  }

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
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
          onClick={handleEye}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye': currentTodo !== todo,
                'far fa-eye-slash': currentTodo && currentTodo.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
