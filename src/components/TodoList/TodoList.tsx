/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import cn from 'classnames';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  dispatch: AppDispatch,
  currentTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({ todos, dispatch, currentTodo }) => {
  const filter = useAppSelector(state => state.filter);

  const searchValidation = (todo: Todo) => {
    return todo.title.toLowerCase().includes(filter.query.trim().toLowerCase());
  };

  const filteredTodos = todos.filter(todo => searchValidation(todo)
    && (filter.status === 'all'
    || (filter.status === 'active' && !todo.completed)
    || (filter.status === 'completed' && todo.completed)));

  return (
    <>
      {filteredTodos.length > 0 ? (
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
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {
                    todo.completed
                    && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )
                  }

                </td>

                <td className="is-vcentered is-expanded">
                  <p className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                  >
                    {todo.title}

                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      dispatch(currentTodoActions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className={cn({
                        'far fa-eye': !currentTodo,
                        'far fa-eye-slash': currentTodo,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

    </>
  );
};
