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
  const currentTodoId = useAppSelector(state => state.currentTodo?.id);
  const { id: todoId, completed } = todo;

  return (
    <tr
      key={todoId}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': currentTodoId === todoId,
      })}
    >
      <td className="is-vcentered">{todoId}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
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
            <i className={`far ${currentTodoId === todoId ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoListItem;
