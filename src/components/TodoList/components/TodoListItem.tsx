import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../../types/Todo';
import { actions } from '../../../features/currentTodo';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

type Props = {
  todo: Todo,
};

const TodoListItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const todoId = useAppSelector(state => state.currentTodo?.id);

  return (
    <tr
      key={todo.id}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': todoId === todo.id,
      })}
    >
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
          onClick={() => dispatch(actions.setTodo(todo))}
        >
          <span className="icon">
            {todoId === todo.id ? (
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

export default TodoListItem;
