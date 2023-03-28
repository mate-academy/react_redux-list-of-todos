import React from 'react';
import {
  setLocalStorage,
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { actionsTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const ListButton: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodoOpen = useAppSelector(state => state.currentTodo);

  const openTodo = (currentTodo: Todo) => {
    dispatch(actionsTodo.setTodo(currentTodo));
    setLocalStorage('currentTodo', currentTodo);
  };

  return (
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={() => openTodo(todo)}
      >
        <span className="icon">
          <i
            className={
              currentTodoOpen !== null ? 'far fa-eye-slash' : 'far fa-eye'
            }
          />
        </span>
      </button>
    </td>
  );
};
