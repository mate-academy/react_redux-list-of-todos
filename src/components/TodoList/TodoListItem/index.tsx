import { FC, memo } from 'react';
import classnames from 'classnames';
import { ITodo } from '../../../models/ITodo';

type TodoListItemProps = {
  todo: ITodo;
  isSelected: boolean;
  onUserSelect: (userId: number) => void;
  onTodoDelete: (todoId: number) => void;
};

const TodoListItem: FC<TodoListItemProps> = memo(
  ({
    todo: {
      id, userId, title, completed,
    },
    isSelected,
    onUserSelect,
    onTodoDelete,
  }) => (
    <li
      className={classnames(
        'TodoList__item',
        {
          'TodoList__item--unchecked': !completed,
          'TodoList__item--checked': completed,
        },
      )}
    >
      <label htmlFor={`${id}`}>
        <input
          type="checkbox"
          checked={completed}
          readOnly
          id={`${id}`}
        />
        <p>{title}</p>
      </label>
      <div>
        <button
          className="TodoList__user-button button"
          type="button"
          onClick={() => onTodoDelete(id)}
        >
          Delete Todo
        </button>
        <button
          className={classnames(
            'TodoList__user-button',
            'button',
            {
              'TodoList__user-button--selected': isSelected,
            },
          )}
          type="button"
          onClick={() => onUserSelect(userId)}
        >
          {`User ${userId}`}
        </button>
      </div>
    </li>
  ),
);

export default TodoListItem;
