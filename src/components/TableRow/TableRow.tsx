import { useCallback } from 'react';
import classNames from 'classnames';

import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo
};

export const TableRow: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(store => store.currentTodo);

  const setCurrentTodo = (
    todoItem: Todo,
  ) => dispatch(currentTodoActions.setTodo(todoItem));

  const unsetCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  const toggleCurrentTodo = useCallback((toggledTodo: Todo) => {
    return currentTodo?.id === toggledTodo.id
      ? unsetCurrentTodo()
      : setCurrentTodo(toggledTodo);
  }, [currentTodo]);

  return (
    <tr
      data-cy="todo"
      key={id}
      className={classNames(
        { 'has-background-info-light': currentTodo?.id === id },
      )}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            { 'has-text-danger': !completed },
            { 'has-text-success': completed },
          )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => toggleCurrentTodo(todo)}
        >
          <span className="icon">
            {
              currentTodo?.id === id
                ? (<i className="far fa-eye-slash" />)
                : (<i className="far fa-eye" />)
            }
          </span>
        </button>
      </td>
    </tr>
  );
};
