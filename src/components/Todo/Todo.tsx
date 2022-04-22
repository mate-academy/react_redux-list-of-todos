/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedUserIdSelector } from '../../store/selectors';
import { ACTIONS_CREATORS } from '../../store/actions/todos.actions';
import { removeTodo } from '../../data/todos.api';

type Props = {
  todo: Todo
};

export const Todo: FC<Props> = ({ todo }) => {
  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const dispatch = useDispatch();

  const { setSelectedUserId, removeTodoById } = ACTIONS_CREATORS;

  const deleteTodo = async (todoId: number) => {
    await removeTodo(todoId);

    dispatch(removeTodoById(todoId));
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
          onClick={() => dispatch(setSelectedUserId(todo.userId))}
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
};
