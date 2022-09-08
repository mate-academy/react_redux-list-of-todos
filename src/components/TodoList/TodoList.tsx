import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  currentTodo: Todo | null;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, currentTodo } = props;

  const dispatch = useDispatch();

  return (
    <>
      {todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">

                <p className={cn(
                  {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  },
                )}
                >
                  {todo.title}

                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch({
                    type: 'currentTodo/SET', payload: todo,
                  })}
                >
                  <span className="icon">
                    <i className={cn(
                      'far',
                      {
                        'fa-eye': todo.id !== currentTodo?.id,
                        'fa-eye-slash': todo.id === currentTodo?.id,
                      },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
};
