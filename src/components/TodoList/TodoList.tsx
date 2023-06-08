import classNames from 'classnames';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
}) => {
  const dispatch = useAppDispatch();
  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  return (
    <>
      {!todos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {todos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': currentTodo?.id === id,
                  })}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  {completed ? (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td className="is-vcentered" />
                  )}
                  <td className="is-vcentered is-expanded">
                    <p className={classNames({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setTodo(todo)}
                    >
                      <span className="icon">
                        <i className={classNames('far', {
                          'fa-eye': currentTodo?.id !== id,
                          'fa-eye-slash': currentTodo?.id === id,
                        })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

    </>
  );
};
