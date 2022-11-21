import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const selected = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const todos = useAppSelector(state => state.todos);
  const [filtred, setFiltred] = useState<Todo[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFiltred(todos);
  }, [todos]);

  useEffect(() => {
    const newTodo = todos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    switch (status) {
      case Status.ACTIVE:
        setFiltred(newTodo.filter(todo => !todo.completed));
        break;
      case Status.COMPLETED:
        setFiltred(newTodo.filter(todo => todo.completed));
        break;
      case Status.ALL:
      default:
        setFiltred(newTodo);
    }
  }, [status, query]);

  const handleModalOpen = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {filtred.length <= 0 ? (
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

            {filtred.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames(
                  {
                    'has-background-info-light': selected?.id === todo.id,
                  },
                )}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={classNames({
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
                    onClick={() => handleModalOpen(todo)}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'far',
                        {
                          'fa-eye-slash': selected?.id === todo.id,
                          'fa-eye': selected?.id !== todo.id,
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
      )}

    </>
  );
};
