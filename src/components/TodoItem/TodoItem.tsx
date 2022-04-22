import { FC, memo } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedUserIdSelector } from '../../store/selectors';
import { ACTIONS_CREATORS } from '../../store/actions/todos.actions';
import { removeTodo } from '../../data/todos.api';
import { Todo } from '../../types/todo.type';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = memo(({ todo }) => {
  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const dispatch = useDispatch();

  const { setSelectedUserById, removeTodoById } = ACTIONS_CREATORS;

  const deleteTodo = async (todoId: number) => {
    await removeTodo(todoId);

    if (todoId) {
      dispatch(removeTodoById(todoId));
    }
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
        />
        <p>{todo.title}</p>
      </label>

      <div className="TodoList__btns">
        <button
          type="button"
          className={classNames(
            'TodoList__user-button', 'button', {
              'TodoList__user-button--selected':
                todo.userId === selectedUserId,
            },
          )}
          onClick={() => {
            dispatch(setSelectedUserById(todo.userId));
          }}
        >
          {`User #${todo.userId}`}
        </button>
        <button
          type="button"
          className="TodoList__user-button button"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </>
  );
});
