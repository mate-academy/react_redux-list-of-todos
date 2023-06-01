import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = (todoId: Todo) => {
    dispatch(currentTodoActions.setTodo(todoId));
  };

  return (
    <tr
      className={classNames(
        selectedTodo?.id === todo.id
          ? 'has-background-info-light'
          : '',
      )}
      data-cy="todo"
    >
      <td className="is-vcentered">
        {todo.id}
      </td>

      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        {selectedTodo?.id === todo.id ? (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
          >
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        ) : (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => handleSelectTodo(todo)}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};
