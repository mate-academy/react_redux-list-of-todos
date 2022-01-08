import classNames from 'classnames';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions as actionsTodos } from '../../store/todos';
import { Todo } from '../../types/todo';

type Props = {
  todos: Todo[];
  handleSetUserId: (id: number) => void,
  selectedUserId: number,
};

export const TodoList: FC<Props> = React.memo(({ todos, handleSetUserId, selectedUserId }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number | string) => {
    dispatch(actionsTodos.deleteTodo(id));
  };

  return (
    <ul className="list-group">
      {!!todos.length && (
        todos.map((todo) => (
          <li
            key={todo.id}
            className={classNames(
              'list-group-item d-flex',
              {
                'list-group-item-warning': !todo.completed,
                'list-group-item-success': todo.completed,
              },
            )}
          >
            <input
              className="form-check-input me-1"
              type="checkbox"
              checked={todo.completed}
              readOnly
            />
            {todo.title}

            <button
              type="button"
              className="badge bg-primary"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
            <button
              type="button"
              className={classNames(
                'badge bg-primary rounded-pill ms-auto',
                {
                  'bg-success': selectedUserId === todo.userId,
                },
              )}
              onClick={() => handleSetUserId(todo.userId)}
            >
              User Id: - &ensp;
              {todo.userId}
            </button>
          </li>
        ))
      )}
    </ul>
  );
});
