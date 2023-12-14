import { FC } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type TTodoItemProps = {
  todo: Todo
};

export const TodoItem:FC<TTodoItemProps> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr key={todo.id} data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td aria-label="check" className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
        })}
        >
          {todo.title}
        </p>
      </td>

      <td aria-label="title" className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          aria-label="button to show user info"
          onClick={() => handleOpenModal()}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !currentTodo,
              'fa-eye-slash': currentTodo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
