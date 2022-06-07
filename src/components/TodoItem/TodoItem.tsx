import React from 'react';
import classnames from 'classnames';

interface Props {
  todo: Todo,
  selectUser: ((id: number) => void),
  onChange: ((child: Todo) => void),
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectUser,
  onChange,
}) => {
  return (
    <li className={classnames(
      'TodoList__item',
      { 'TodoList__item--checked': todo.completed },
    )}
    >
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChange(todo)}
          readOnly
        />
        <p>{todo.title}</p>
      </label>
      {todo.userId && (
        <button
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
          data-cy="userButton"
          onClick={() => selectUser(todo.userId)}
        >
          User&nbsp;
          {todo.userId}
        </button>
      )}
    </li>
  );
};
