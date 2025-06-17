import React from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const isSelected = useAppSelector(state => state.currentTodo)?.id === todo.id;

  const handleSelect = () => dispatch(setCurrentTodo(todo));

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          onClick={handleSelect}
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={isSelected ? 'fa-eye-slash' : 'fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
