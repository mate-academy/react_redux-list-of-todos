import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
  isSelected: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, isSelected }) => {
  const dispatch = useDispatch();
  const { setCurrentTodo } = currentTodoSlice.actions;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
      key={todo.id}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={() => dispatch(setCurrentTodo(todo))}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
