import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo, loadUser } from '../../store';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = React.memo(({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li
      className={classNames(
        'TodoList__item',
        {
          'TodoList__item--checked': todo.completed,
          'TodoList__item--unchecked': !todo.completed,
        },
      )}
    >
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
        />
        <p>{todo.title}</p>
      </label>
      <div className="TodoList__button-group">
        <button
          className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
          type="button"
          onClick={() => {
            dispatch(loadUser(todo.userId));
          }}
        >
          <p>{`User ${todo.userId}`}</p>
        </button>

        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            dispatch(deleteTodo(todo.id));
          }}
        >
          <p>X</p>
        </button>
      </div>
    </li>
  );
});
