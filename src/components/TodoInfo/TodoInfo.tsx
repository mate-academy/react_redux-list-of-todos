import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as todoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [buttonHandler, setButtonHandler] = useState(false);
  const dispatch = useAppDispatch();

  const todoButtonHandler = () => {
    setButtonHandler(!buttonHandler);
  };

  const selectedTodoSaver = () => {
    if (buttonHandler) {
      dispatch(todoActions.setTodo(todo));
    }

    dispatch(todoActions.removeTodo());
  };

  useEffect(() => {
    selectedTodoSaver();
  }, [buttonHandler]);

  return (
    <>
      <tr data-cy="todo">
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
        </td>

        <td className="is-vcentered is-expanded">
          <p className={classNames(
            { 'has-text-danger': !todo.completed },
            { 'has-text-success': todo.completed },
          )}
          >
            {todo.title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={todoButtonHandler}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
