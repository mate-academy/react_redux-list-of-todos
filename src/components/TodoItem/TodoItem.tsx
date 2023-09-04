import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodo: Todo | null,
  todo: Todo,
  showTodoUser: (value: Todo) => void,
};

export const TodoItem: FC<Props> = ({ todo, currentTodo, showTodoUser }) => {
  const { id, title, completed } = todo;

  return (
    <>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        <span className="icon" data-cy="iconCompleted">
          {completed && (<i className="fas fa-check" />)}
        </span>
      </td>

      <td className="is-vcentered is-expanded">
        <p className={
          !completed ? 'has-text-danger' : 'has-text-success'
        }
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        {todo !== currentTodo
          ? (
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => showTodoUser(todo)}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          )
          : (
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => showTodoUser(todo)}
            >
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          )}
      </td>
    </>
  );
};
