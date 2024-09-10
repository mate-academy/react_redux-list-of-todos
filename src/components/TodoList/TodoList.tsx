/* eslint-disable */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  openerModalWindow: (userId: number, todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ openerModalWindow }) => {
  const todos = useSelector<RootState, Todo[]>(state => state.todosSlice.todos);
  const status = useSelector<RootState, Status>(
    state => state.filterSlice.status,
  );
  const query = useSelector<RootState, string>(
    state => state.filterSlice.query,
  );
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodoSlice.currentTodo,
  );

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (query.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }
    switch (status) {
      case 'active':
        return result.filter(todo => !todo.completed);

      case 'completed':
        return result.filter(todo => todo.completed);

      default:
        return result;
    }
  }, [query, status, todos]);

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        {!filteredTodos.length && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}

        {filteredTodos.length > 0 && (
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
        )}
        <tbody>
          {filteredTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i
                      className={classNames('fas', {
                        'fa-check': todo.completed,
                      })}
                    />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => openerModalWindow(todo.userId, todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': currentTodo?.id !== todo.id,
                        'fa-eye-slash': currentTodo?.id === todo.id,
                      })}
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
