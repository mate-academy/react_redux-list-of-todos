import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch } from '../../hooks';

type Props = {
  todo: Todo;
  isModalOpen: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, isModalOpen }) => {
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCurrentTodo(todo));
    setIsSelected(true);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setIsSelected(false);
    }
  }, [isModalOpen]);

  return (
    <tr
      data-cy="todo"
      className={isSelected ? 'has-background-info-light' : ''}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : (
          ''
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? `has-text-success` : `has-text-danger`}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClick}
        >
          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'} `} />
          </span>
        </button>
      </td>
    </tr>
  );
};
