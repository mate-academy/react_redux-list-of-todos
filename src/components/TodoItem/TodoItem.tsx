import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as TodoAction } from '../../features/currentTodo';

interface Props{
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const checkIfSelected = (todo: Todo) => {
    if (currentTodo?.id === todo.id) {
      dispatch(TodoAction.removeTodo());

      return;
    }

    dispatch(TodoAction.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': currentTodo?.id === item.id,
      })}
    >
      <td className="is-vcentered">{item.id}</td>
      {!item.completed
        ? (
          <td className="is-vcentered" />
        )
        : (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        )}
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !item.completed,
            'has-text-success': item.completed,
          })}
        >
          {item.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => checkIfSelected(item)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': currentTodo?.id !== item.id,
              'fa-eye-slash': currentTodo?.id === item.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
