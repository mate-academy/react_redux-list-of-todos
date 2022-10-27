import React from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const dispatch = useDispatch();
  const currentTodo: Todo | null = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': currentTodo?.id === todo.id,
      })}
      key={todo.id}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon">
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
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            dispatch(actions.setTodo(todo));
          }}
        >
          <span className="icon">
            <i
              className={classNames('far fa-eye', {
                'fa-eye-slash': currentTodo?.userId === todo.userId,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
