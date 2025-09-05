import React from 'react';
import { Todo } from '../../../types/Todo';
import { setTodo } from '../../../features/currentTodo';
import { useAppDispatch } from '../../../app/hooks';

type Props = {
  todo: Todo;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoItem: React.FC<Props> = ({ todo, setIsActive }) => {
  const dispatch = useAppDispatch();

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : (
          ''
        )}{' '}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            dispatch(setTodo(todo));
            setIsActive(true);
          }}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
