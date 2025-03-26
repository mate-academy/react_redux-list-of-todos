import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  todo: Todo;
  isSelected: boolean;
};

export const TodoLine: React.FC<Props> = ({ todo, isSelected }) => {
  const selectedTodoDispatch = useAppDispatch();

  const changeCurrentTodo = (newTodos: Todo) => {
    selectedTodoDispatch(currentTodoSlice.actions.changeCurrentTodo(newTodos));
  };

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
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
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
          onClick={() => {
            changeCurrentTodo(todo);
          }}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
